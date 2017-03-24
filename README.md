# Lyft CLI
[![Coverage Status](https://coveralls.io/repos/github/djchie/lyft-cli/badge.svg?branch=master)](https://coveralls.io/github/djchie/lyft-cli?branch=master)
[![Build Status](https://travis-ci.org/djchie/lyft-cli.svg?branch=master)](https://travis-ci.org/djchie/lyft-cli)
[![npm version](https://badge.fury.io/js/lyft-cli.svg)](https://badge.fury.io/js/lyft-cli)

## Introduction

This is the Lyft CLI. Saw jaebradley create one for Uber, and thought, why not make one for Lyft as well.

Use it to check for the estimated prices for a ride or for the estimated time for a car to arrive. You can also see if the lyft, lyft line, or lyft plus service is available at your address and get the estimated distance of the closest lyft, lyft line, or lyft plus car.

You can also use any of the commands below via your current location, meaning you don't have to enter in a pickup address. To do so, simply ignore the `'pickup address here'` argument for the `time`, `types`, and `drivers` commands and the `-e 'end address'` argument for the `price` command. Note however, that the current location feature takes a little longer to render.

Just like Jae, I hate breaking my workflow and having to go through my phone to see if I should order a Lyft or not just to realize that I shouldn't and that I should just walk home instead. I'd rather just break my workflow while in the command line. 

## Install via NPM

```
npm install lyft-cli -g
```

## Usage

### Get Time=To-Pickup Estimates

#### Current Location

```
lyft time
```

#### With Pickup Address

```
lyft time 'pickup address here'
```

![alt_text](http://imgur.com/UPLOADIMG!!!.png)

### Get Price Estimates

#### Current Location

```
lyft price -e 'end address'
```

#### With Pickup Address

```
lyft price -s 'start address' -e 'end address'
```

![alt_text](http://imgur.com/UPLOADIMG!!!.png)

### Get Services Avaible

#### Current Location

```
lyft types
```

#### With Pickup Address

```
lyft types 'pickup address here'
```

![alt_text](http://imgur.com/UPLOADIMG!!!.png)

### Get Closest Car Estimates

#### Current Location

```
lyft drivers
```

#### With Pickup Address

```
lyft drivers 'pickup address here'
```

![alt_text](http://imgur.com/UPLOADIMG!!!.png)

## License

[MIT](LICENSE.md)

## Credits

This project is heavily inspired by [Jae Bradley](https://github.com/jaebradley)'s [uber-cli](https://github.com/jaebradley/uber-cli)
