friction-menu
=============

Bring a trendy Angular.js friction menu to your page!

###social-linker v0.0.1

Just what the doctor ordered, a friction menu for Angular. You heard me.

**friction-menu-opts or frictionMenuOpts has to exists in the scope somewhere, either as an attribute or in a controller.**

use like:
```<div friction-menu friction-menu-opts={"watch" : ["/posts/","/coolPlace/"], "showWhenScrolledTo" : "300px"}></div>```

1. Import **frictionMenu** into your main app module
2. Create the friction-menu-opts or frictionMenuOpts object (shown above)
3. Throw some options in there (shown below)
4. Cry a little, and marvel

**Options:**
<watch> **ARRAY** paths to match when to show the menu.  i,e watch : ["/posts/"]
<defaultVisible> **BOOLEAN** Whether or no to show of collapse the friction menu on load
<showWhenScrolledTo> **BOOL OR STRING** if you put a pixel amount (i,e 300px) the menu wont appear until you scroll to that point, false for disabled

**TODO:**
  1. Add more options
  2. Remove jQuery
  3. Put some candy out to trap the neighbor's dog
