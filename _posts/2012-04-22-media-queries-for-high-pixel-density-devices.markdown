---
author: Tony Thomas
comments: true
date: 2012-04-22 23:46:12+00:00
layout: post
slug: media-queries-for-high-pixel-density-devices
title: Media Queries for High Pixel-density Devices
wordpress_id: 689
categories:
- css
- media-queries
- Mobile-Technology
- responsive-design
- web-development
---

Images continue to be a major challenge for mobile web development. [I've
written about a technique to evaluate screen dimensions and pixel-density using
JavaScript](http://anthonygthomas.com/2012/02/16/responsive-images-keep-it-simple-keep-it-small/).
I recently came across some vendor-prefixed media queries to evaluate screen
density right in your CSS. ([Hat tip to Erik
Runyon](http://weedygarden.net/2010/10/retina-display-and-css-background-images/).)

The technique involves creating two sets of background images. One
standard-sized version and a double-sized version (@2x) for high pixel-density
screens like the Retina display or Droid phone display. For the
purposes of this example, let's say I have a default icon that's 50px X 50px.

{% highlight css %}
    #link-id a { background-image:url(images/icon.png); }
{% endhighlight %}

The Motorola Droid has a pixel-density of 1.5 so I set that as my baseline.

{% highlight css linenos %}
    @media only screen and (-webkit-min-device-pixel-ratio: 1.5),
        only screen and (-o-min-device-pixel-ratio: 3/2),
        only screen and (min--moz-device-pixel-ratio: 1.5),
        only screen and (min-device-pixel-ratio: 1.5) {
            #link-id a {
                background-image:url(images/icon@2x.png);
            }
    }
{% endhighlight %}

Notice the subtle difference in how the ratio is calculated for Opera. Also,
Mozilla's vendor prefix has a slightly different syntax. I'm following Erik
Runyon's advise here and using Apple's style guidelines by naming the hi-res
icon with the same name as my normal-resolution icon, but with `@2x` appended.
In this case, the "@2x" version is 100px X 100px. The next thing you'll have to
do is scale the hi-res icon down.

{% highlight css %}
    background-size: 50px 50px;
{% endhighlight %}

That's it. Now high pixel-density devices will render a suitably
high-resolution image and normal-resolution devices will get a smaller image.
