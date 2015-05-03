Vagrant.configure(2) do |config|
  config.vm.box = "verticalpalette/ellies-pad"
  config.vm.box_url = "http://storage.googleapis.com/verticalpalette/ellies-pad.box"

  # BrowserSync
  config.vm.network "forwarded_port", guest: 3000, host: 3000

  config.vm.synced_folder ".", "/vagrant", disabled: true

  config.vm.synced_folder ".", "/home/vagrant/gopath/src/github.com/verticalpalette/ellies-pad"

  config.vm.provider "virtualbox" do |vb|
    vb.cpus = 4
    vb.memory = 4096
  end

  config.vm.provision "shell", inline: <<-SHELL
    # sudo apt-get update
    # sudo apt-get install git
    # sudo apt-get install zsh

    # export VAGRANT=true
    # export ELLIESPATH="/home/vagrant/gopath/src/github.com/verticalpalette/ellies-pad"
    # export GOPATH="/home/vagrant/gopath:$ELLIESPATH/3rdparty/go"
    # export PATH="$ELLIESPATH/tools/linux/64-bit/bin:$PATH"
  SHELL
end
