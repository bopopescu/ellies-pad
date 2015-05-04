//usr/bin/env goapp run $0 "$@"; exit
package main

import (
	"errors"
	"fmt"
	"os"
	"os/exec"
	"path"
	"strings"
)

func main() {
	var err error
	elliespath := os.Getenv("ELLIESPATH")
	if elliespath == "" {
		fmt.Fprintln(os.Stderr, "deploy: $ELLIESPATH not set")
		os.Exit(1)
	}

	err = buildWebApp(elliespath)
	if err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}

	err = deployAppEngine(elliespath)
	if err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
}

func buildWebApp(elliespath string) error {
	fmt.Println("deploy: Building web app.")
	npm := exec.Command("npm", "run", "deploy")
	npm.Dir = path.Join(elliespath, "web")
	npm.Stdout = os.Stdout
	npm.Stderr = os.Stderr
	return npm.Run()
}

func deployAppEngine(elliespath string) error {
	fmt.Println("deploy: Deploying to AppEngine.")
	ae := exec.Command("appcfg.py", "update", path.Join(".", "api"))

	if os.Getenv("VAGRANT") == "true" {
		ae.Args = append(ae.Args,
			// Don't save credentials to disk because we don't want to
			// accidentally upload our access token when we run `vagrant package`.
			"--no_cookies",
			"--oauth2",
			"--noauth_local_webserver",
		)
		ae.Stdin = os.Stdin
	} else if os.Getenv("TRAVIS") == "true" {
		email := os.Getenv("APPENGINE_EMAIL")
		if email == "" {
			return errors.New("deploy: $APPENGINE_EMAIL not set")
		}
		password := os.Getenv("APPENGINE_PASSWORD")
		if password == "" {
			return errors.New("deploy: $APPENGINE_PASSWORD not set")
		}

		ae.Args = append(ae.Args, fmt.Sprintf("--email=%s", email), "--passin")
		// --passin expects the password to come from stdin.
		ae.Stdin = strings.NewReader(password)
	} else {
		ae.Args = append(ae.Args, "--oauth2")
	}

	ae.Dir = elliespath
	ae.Stdout = os.Stdout
	ae.Stderr = os.Stderr

	return ae.Run()
}
