# bravia
Remote Control your Sony Bravia

## Install

```bash
$ npm i @teitei-tk/bravia

or

$ yarn add @teitei-tk/bravia
```

## Setup
### TV Setup
* Turn on your TV
* On the TV go to Settings > Network > Home network setup > Remote device/Renderer > On
* On the TV go to Settings > Network > Home network setup > IP Control > Authentication > Normal and Pre-Shared Key
* On the TV go to Settings > Network > Home network setup > Remote device/Renderer > Enter Pre-Shared Key > 0000 (or whatever you want your PSK Key to be)
* On the TV go to Settings > Network > Home network setup > Remote device/Renderer > Simple IP Control > On

### Environment Variable
```bash
export IP_ADDR="Your TV IP address"
export PSK_KEY="0000"
```

## Usage
#### fetch available commands
```bash
$ ./node_modules/.bin/commands
Num1
Num2
Num3
Num4
Num5
Num6
Num7
Num8
Num9
Num0
Num11
Num12
Enter
GGuide
ChannelUp
ChannelDown
VolumeUp
VolumeDown
....
....
....
```

#### exec command
```bash
# volume up
$ ./node_modules/.bin/request VolumeUp

# change netflix
$ ./node_modules/.bin/request Netflix
```

## LICENSE
Apache License 2.0
