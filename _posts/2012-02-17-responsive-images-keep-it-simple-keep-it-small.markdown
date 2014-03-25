---
author: admin
comments: true
date: 2012-02-17 01:58:03+00:00
layout: post
slug: responsive-images-keep-it-simple-keep-it-small
title: 'Responsive Images: Keep It Simple; Keep It Small'
wordpress_id: 630
categories:
- JavaScript
- responsive-design
- responsive-images
- web-development
---

There's a lot of excitement about responsive design in the mobile web development world. One of the techniques used in responsive design is responsive or adaptive images. There are a handful of techniques out there including CSS fluid images, using [overflow:hidden to crop images](http://demo.solemone.de/overflow-image-with-vertical-centering-for-responsive-web-design/) and using [a combination of .htaccess settings and PHP to deliver device-specific images](http://adaptive-images.com/).

The first two solutions are fairly simple, but ignore one problem: serving a larger-than-necessary image over a potentially slow network to a user who may have limitations on the amount of data they can receive. Keeping website size down is also important now because [Google is using site speed as a criterion for search rankings](http://googlewebmastercentral.blogspot.com/2010/04/using-site-speed-in-web-search-ranking.html). So, while I find the first two solutions interesting, I don't think they're the best we can do.

The adaptive image technique of routing image requests with a cookie and some Apache settings in an .htaccess file is also interesting. It too has limitations. First, it's not for the faint of heart. If you don't know your way around Apache directives, it might not be for you. It also relies on a PHP file. If you're not using PHP, you're out of luck. I'm no Apache expert, but I have some experience redirecting requests using .htaccess. Setup for adaptive images proved difficult because:



	
  1. I found it hard to incorporate the .htaccess settings alongside our other Apache directives that already exist.
  2. I only needed responsive images for part of the site


I freely admit that those limitations are mine and not anything fundamentally wrong with the method. If I were better with regular expressions, I probably could have gotten it going.

There is one limitation that is not taken into account: screen pixel density. A handful of Android phones have high resolution displays that defy how we typically understand pixels. The true resolution of the screen is 480 X 854 in this instance. Same for the iPhone 4. It has a pixel resolution of 640 X 960. No problem, right? Things get complicated when we use this meta tag:

{% highlight html %}
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
{% endhighlight %}

That meta tag is extremely useful because it forces those high density screens to render text much like their normal-density counterparts. In practical terms, if the above meta tag is in the head of your web page, an iPhone 4 will report a resolution of 320 X 480 and render text accordingly--making it more readable.

Life is great at this point because without that meta information, text will render much differently on a handful of high pixel-density phones.

We run into problems when we need to get accurate pixel counts of the device in question. Now that I've got consistently readable text on a wide variety of devices, I suddenly have wildly inaccurate information on pixels that are relevant to rendering images. Now when I call:

`h = screen.height;`

An iPhone 4 will tell me that the screen height is 480 pixels when, for the purpose of rendering images, it's actually 960 pixels. No big deal, but if I'm using JavaScript to determine the screen size so I can load an appropriately sized image, it's going to load one that's designed for a 480 pixel-width screen and it's going to look terrible if the user switches to landscape mode.

Worse yet, while the iPhone 4 has a pixel density of 2, the Motorola Droid has a pixel density of 1.5. We _could_ do some user agent sniffing to accomodate this, but the mobile device market changes so rapidly it would be nearly impossible to keep up with. Web standards tell us to look for supported features, not specific devices. So no user agent sniffing.

Luckily WebKit offers an imperfect solution that just happens to work in all the high pixel-density devices I'm aware of as of now:

`window.devicePixelRatio`

Now we can get the true number of pixels like so:

{% highlight javascript linenos %}
	// Set the default directory to 320
		"use strict";
		d = 320;

		// Get the screen height
		h = screen.height;
		
		// set the height for non webkit browsers
		height = h;

		// Get the pixel ratio
		r = window.devicePixelRatio;

		// if devicePixelRatio is supported, calculate the device height
		if (typeof r !== 'undefined')
		{
			// Calculate the true number of pixels on the screen
			height = h * r;
		}
{% endhighlight %}
	
My technique is to save images at several common device heights (because height becomes width in landscape mode) and write the image tag using JavaScript, so the device gets the smallest possible image that will still look good on the screen. The full script looks like so:

{% highlight javascript linenos %}
	/****
	 * Loads different header images based on the device height and pixel density (for webkit browsers)
	 * Height is used because at any time, the device could potentially be turned to landscape mode
	 */

	/**
	 * @var string
	 * vars for directory (d), height (h), pixel ratio (r) and height
	 */
	var d, h, r, height;

	/*
	* Bind these to pagecreate so they work with JQuery Mobile's automagic AJAX page loads
	*/
	$('#page-id').live('pagecreate', function(event)
	{
		// Set the default directory to 320
		"use strict";
		d = 320;

		// Get the screen height
		h = screen.height;
		
		// set the height for non webkit browsers
		height = h;

		// Get the pixel ratio
		r = window.devicePixelRatio;
		
		if (typeof r !== 'undefined')
		{
			// Calculate the true number of pixels on the screen
			height = h * r;
		}

		// Set the image directory accordingly
		if (height <= 320)
		{
			// load 320 header
			d = 320;
		}
		// Probably the most common height for current smartphones
		else if (height <= 480)
		{
			// load 480 header
			d = 480;
		}
		// Many Motorola & HTC devices have an 800-pixel height
		else if (height <= 800)
		{
			// load 800 header
			d = 800;
		}
		// iPhone 4 & Droid
		else if (height > 800)
		{
			// load 960 header
			d = 960;
		}
		
		$('a#header-home-link').html('<img src="/images/mobile/' + d + '/header.png" alt="This is alt text." id="logo" class="logos" />');
	});
{% endhighlight %}

When the page loads, `#header-home-link` is just a normal HTML link with no image tag at all, so no image is loaded until we've determined the device screen size and write in the image tag with JavaScript (JQuery).

This technique will only work on WebKit browsers since other browsers don't support `devicePixelRatio` at this time. Fortunately, this falls firmly within progressive enhancement. It's not ideal if another mobile browser loads a pixelated image, but it has no effect on how the page itself functions.

Aside: You may have noticed that this is all bound to a 'pagecreate' event instead of the normal `ready()` method in JQuery. [That's because I'm using JQuery Mobile in this instance](http://jquerymobile.com/test/docs/api/events.html).

So there you have it. Detecting screen dimensions in pixels is fairly easy, but you do need to account for pixel density. While this approach is not perfect, it works well in most devices and as of now, no standard way of serving responsive images has emerged. This is as good as anything I've found.
