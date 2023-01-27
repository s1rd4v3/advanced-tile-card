# Advanced Tile Card for Lovelace [🚧 under construction 🚧]
> This card is not yet ready for production and is ment for my personal usage primarely. If someone else can use it, all the better.

## Inspiration ❤️
- This card is heavily inspired by [matt8707](https://github.com/matt8707) [hass-config](https://github.com/matt8707/hass-config) config and the main reason I created this card 
- This was done using the [Boilerplate Card](https://github.com/custom-cards/boilerplate-card) by [@iantrich](https://www.github.com/iantrich).

## Features
- A click on the icon triggers the main entity action if there is an obvious one, a click on the rest of the card opens the `more-info` dialog
- Entities with pictures (like camera, person or media_players) can add the picture to the icon or to the background

## Installation via HACS
HACS installation: Go to the hacs store and add a custom repo url https://github.com/s1rd4v3/advanced-tile-card to install.

_TBD_
- add theme installation instructions
- add image installation instructions
- add screenshot



## Next up
- General
    - State string
        - Conditional rendering
        - State attribute modifier
    - Background image
        - Conditional rendering
    - Possibility to add additional state bubble to the top right similar to [hass-config](https://github.com/matt8707/hass-config)?
    - CSS optimisations
        - Responsivne
        - Preview fix
        - Font sizings
        - ...
    - Custom actions
    - Swipercard implementation?
- Camera
    - WebRTC support?
- Sensor entity
    - Visualize data with graph as background?
- Media player entity
    - Add progress bar if available?
- ...
