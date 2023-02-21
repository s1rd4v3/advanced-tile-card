# Advanced Tile Card for Lovelace [🚧 under construction 🚧]
> This card is for my personal usage primarely and not ready for production. So feel free to reuse!

## Inspiration ❤️
- This card is heavily inspired by [matt8707](https://github.com/matt8707) [hass-config](https://github.com/matt8707/hass-config) config and the main reason I created this card 
- This was done using the [Boilerplate Card](https://github.com/custom-cards/boilerplate-card) by [@iantrich](https://www.github.com/iantrich).

## Installation via HACS
HACS installation: Go to the hacs store and add a custom repo url https://github.com/s1rd4v3/advanced-tile-card to install.

_TBD_
- add theme installation instructions
  - add image installation instructions
- add screenshot


## Features
- Add custom actions for icon taps or default taps
- Entities with pictures (like camera, person or media_players) can add the picture to the icon or to the background
- State string can be rendered conditionally
  - Entity attribute can be used instead of state string (like `media_title` for `media_player` domain)


## Next up
- General
    - State string
        - use [templating](https://www.home-assistant.io/docs/configuration/templating/) via [jinja](https://palletsprojects.com/p/jinja/) for state string 
        - Editor layouting
    - Background image
        - Conditional rendering
    - Possibility to add additional state bubble to the top right similar to [hass-config](https://github.com/matt8707/hass-config)?
    - CSS optimisations
        - Responsivne
        - Preview fix
        - Font sizings
        - ...
    - [Swipercard](https://github.com/bramkragten/swipe-card)?
- Camera
    - WebRTC support?
- Sensor entity
    - Visualize data with graph as background?
- Media player entity
    - Add progress bar if available?
- ...
