---
author: Tony Thomas
comments: true
date: 2012-03-09 17:08:14+00:00
layout: default
slug: using-impress-js
title: Using Impress.js
wordpress_id: 678
categories:
- JavaScript
- JQuery
- web development
---

**Update II:** I updated the init method needed in the HTML.

**Update:** [There is at least one WYSIWYG impress.js editor available now](http://www.hsivaram.com/impressionist/alpha3/).

I came across [Impress.js](http://bartaz.github.com/impress.js/#/bored) a while
back and I was, well, _impressed_. It makes sense to do presentations on the
web, given the powerful animations and transitions available in modern
browsers. Impress is sort of like [Prezi](http://prezi.com/) _improved_.
Improved because it takes advantage of 3d animation. It does require some
technical skill however. You need to know a bit about HTML5 and you have to be
able to code a web page and write styles.

Right now you can only learn how to use Impress.js by reading the comments and
experimenting. I thought it might be good to go through each of the features
here to give a sense of it's capabilities. If you're interested, there aren't
really any insights here that you can't find in the source.<!-- more -->

The first thing is that you have to have a story to tell. Impress.js does
nothing for you if you don't have a narrative. So plan out what you want to
say. Personally, write out what I want to say in any presentation in prose
first. Just words. That way I can get a cohesive narrative going with good
verbal transitions. Then I think about the visual stuff.

Assuming you know what you want to say, let's move on.

First you'll need to
[download the JavaScript](https://github.com/bartaz/impress.js). 
Next set up an HTML document with the HTML5 doctype. (Impress.js takes
advantage of HTML5'S `data` attribute, so HTML5 is necessary.)

    <!doctype html>
    <html lang="en">
    <head>
        <title>Impress.js Presentation</title>
    </head>
    <body>
    <div id="impress">
    </div>
    <!-- Put the script at the bottom -->
    <script src="js/impress.js"></script>
    <script>impress().init();</script>
    </body>
    </html>

The slides need to go into an element with the id of "impress." It's a div
above, but it can be anything. The comments in the source also suggest adding
the class, "impress-not-supported" to the `#impress` div. This class will be
added if the browser does not support impress, but it's good to have it there
for browsers without JavaScript enabled. `impress-not-supported` allows you to
provide a fallback message.

### Options

Now things get interesting. Each slide should be within `#impress` and have a
class of "step." Positioning information is stored in `data` attributes. First
off are the x and y coordinates. It's important to note that we're defining the
x and y coordinates of the _center_ of the element in question.

    <div class="slide" data-x="-1500" data-y="-1000"><p>Our first slide</p></div>

You can give you slides ids so you can link to a particular slide. Id's are not
required, however. If you don't add them, impress.js will add a #step-N id to
each element and append the hash to the url. While a hash syntax of `#/step-N`
will still work, it's better to use a standard hash like `#step-N` so that
links will still work without JavaScript.

The next dimension we can control is scale:

    <div id="title" class="step" data-x="0" data-y="0" data-scale="4"><p>Slide content</p></div>

Note the `data-scale` attribute above. In this case, the slide is scaled down
by a factor of 4, then scaled up to full-scale during the transition.

We can also control rotation:

    <div id="its" class="step" data-x="850" data-y="3000" data-rotate="90" data-scale="5"><p>Slide Content</p>

For this, use `data-rotate`. In the example above, the slide is rotated 90
degrees.

And now we go 3d:

    <div id="tiny" class="step" data-x="2825" data-y="2325" data-z="-3000" data-rotate="300" data-scale="1"><p>Slide content.</p></div>

The `data-z` attribute above places this slide 3000 pixels away along the
z-index.

Finally, we can control rotation along axes:

    <div id="its-in-3d" class="step" data-x="6200" data-y="4300" data-z="-100" data-rotate-x="-40" data-rotate-y="10" data-scale="2"><p>

Those are the options. I had a little fun creating a [version of my
resume](http://truetone.github.com/impress-resume/). It's pretty fun. I can
also see some storytelling potential with this. Go forth and impress!
