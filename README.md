# Foundry Nova
This module defines an API that allows rapid development in a typed system with more flexible models.

## Usage
This module is mostly a "library" module that defines functions to build uppon.
However, some certain features are usable "out of the box" by defining some simple macros:

 - `novaAPI.dialogs.castBloodMagic().render()` - Will open a dialog for casting blood magic spells. This is meant for DnD 5e, when playing the [blood mage](http://dndncc.wikidot.com/blood-mage) homebrew class
 - `novaAPI.dialogs.spellResearch().render()` - Will open a dialog for studying or creating spells for your spellbook.

## API
The API is exposed on the top level window through the `novaAPI` variable, just like how most of foudry's own API is available through the `game` variable.

### novaAPI.dialogs
Contains a collection of pre-made dialogs ready for use.

### novaAPI.elements
Contains elements used for creating your own `novaAPI.NovaDialog`

### novaAPI.models
Contains modeling for actors and items for some system. So far only dnd5e is supported.
