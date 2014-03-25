---
author: Tony Thomas
comments: true
date: 2012-03-03 20:39:14+00:00
layout: post
slug: fun-with-jquery-tubular
title: Fun With JQuery Tubular
wordpress_id: 670
categories:
- JavaScript
- JQuery
- web development
---

I came across [Sean McCambridge's](http://www.seanmccambridge.com/) [JQuery Tubular](http://www.seanmccambridge.com/tubular/) plugin a while back and I thought it would be fun to experiment with it. [So I set up a little demo](/examples/tubular/tubular.html) and I thought I'd walk through it here.

I should say that it wasn't until I came across [Phil Plait's amazing moon simulation](http://blogs.discovermagazine.com/badastronomy/2012/03/02/nasa-goddard-rocks-the-moon/) that I was inspired to build the demo.

I should also say that my example is completely unnecessary given Sean's documentation. It's really as simple as this:

{% highlight javascript %}
	$('body').tubular('someYTid','video'); // where someYTid is the YouTube ID and wrapper is your containing DIV.
{% endhighlight %}

Once you have JQuery and JQuery Tubular linked in the head of your document and replace 'someYTid' with the id of your YouTube video, it will just work. The rest is styling. In the interest of explaining things all in one place, I'll walk through what I did.

First, you need to set up the JQuery Tubular plugin and dependencies in your document:

{% highlight javascript linenos %}
	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
	<!--[if lt IE 9]>
	<script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
	<script type="text/javascript" charset="utf-8" src="http://ajax.googleapis.com/ajax/libs/swfobject/2.1/swfobject.js"></script>
	<script type="text/javascript" charset="utf-8" src="js/jquery.tubular.js"></script>

{% endhighlight %}

I've loaded JQuery using [Google's CDN](http://code.google.com/apis/libraries/devguide.html), [HTML5 Shiv](http://code.google.com/p/html5shiv/) (because I'm using the HTML5 Doctype), [SWFObject](http://code.google.com/p/swfobject/) and the JQuery Tubular plugin linked above.

Next I set up a few styles. First I load some Google-hosted fonts:

{% highlight html %}
	<link href='http://fonts.googleapis.com/css?family=Stardos+Stencil|Muli&v2' rel='stylesheet' type='text/css'>
{% endhighlight %}	
Then I added a few styles of my own. (This is the "style to taste" portion.)

{% highlight css linenos %}
	/* Use Stardos Stencil for headings */
	h1, h2, h3, h4, h5, h6 {
		font-family: 'Stardos Stencil', cursive;
		font-style: normal;
		font-weight: 400;
		font-size: 64px;
		text-transform: none;
		text-decoration: none;
		letter-spacing: 0em;
		word-spacing: 0em;
		line-height: 1.4;
	}
	/* links are white and bold */
	a {
		color: #fff;
		font-weight: bold;
	}
	/* Give the body a black background and get rid of browser-default margins and padding */
	body {
		background: #000;
		margin: 0;
		padding: 0;
	}
	/* Any text needs to use absolute positioning and have a high z-index to float above the background video */
	h1 {
		color: #fff;
		font-size: 1.2em;
		font-weight: bold;
		position: absolute;
		right: 20px;
		top: 20px;
		z-index: 1000;
	}
	/* Use Muli for paragraphs and set up absolute positioning and high z-index */
	p {
		color: #fff;
		font-family: 'Muli', sans-serif;
		font-style: normal;
		font-weight: 400;
		font-size: 13px;
		left: 20px;
		line-height: 1.4;
		position: absolute;
		word-spacing: 0em;
		text-decoration: none;
		text-transform: none;
		width: 150px;
		z-index: 1000;
	}
	/* Position paragraphs */
	p#first {
		top: 20px;
	}
	p#last {
		top: 50px;
	}
{% endhighlight %}

Next I set up the JavaScript. I really didn't need anything besides the one line of JavaScript at the top of this post, but I wanted to add a few other fancy animations and hover effects. (You could do a lot of this w/ CSS animations/transitions, but that's a topic for another post.)

{% highlight javascript linenos %}
	$().ready(function()
	{       
	    // Instantiate the tubular plugin to load the awesome moon video
	    $('body').tubular('woTCsNNfYEE','video'); // where someYTid is the YouTube ID and wrapper is your containing DIV.
	 
	    // Fade the overlaid text after 5 seconds 
	    $('.fade').delay(5000).animate({
	        opacity: .5
	    }, 1000);
	 
	    // Add a hover effect to those same element that are faded above
	    $('.fade').hover(function()
	    // mousein 
	    {
	        $(this).animate({opacity:1});},
	    // mouseout
	    function()
	    {
	        $(this).animate({opacity:.5});
	    });
	});
{% endhighlight %}

That's it. If you take a look at [Sean's example](http://www.seanmccambridge.com/tubular/), there is more you an do to leverage SWFObject for controlling the video. Use cases for this plugin may be limited, but I can see lots of potential for neat page designs.
