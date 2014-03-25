---
author: admin
comments: true
date: 2011-03-05 21:06:27+00:00
layout: post
slug: when-to-use-the-css-content-property
title: When to Use CSS content Property
wordpress_id: 464
categories:
- css
- web development
tags:
- css
- web development
---

CSS offers a tempting attribute in the `content` property. The syntax is as follows:

[css]content: 'Add this.';[/css]

The code above will append "Add this." to the element, id or class of our CSS declaration. The problem with this is that we're putting content into our presentation code. Also, this content is not accessible by screen readers or search engine crawlers. A good rule of thumb is to use this property as a means of [progressive enhancement](http://www.alistapart.com/articles/understandingprogressiveenhancement/). Generally speaking, I like to use it for presentation that enhances the site, but contributes nothing semantically.

Here's an example:

Let's say we want to use this icon to denote links that are external to our site:
![external link icon](http://anthonygthomas.com/wp-content/uploads/2011/03/external.png)

Use the `content` property:

[css]a.external:after {
    content: url(path/to/external.png);
}[/css]

The image itself provides no semantic value to the document. It's merely an enhancement and would be ignored by screen readers anyway. We can safely useÂ `content` in this case. Another good use is [this tutorial for creating CSS-only arrows](http://www.yuiblog.com/blog/2010/11/22/css-quick-tip-css-arrows-and-shapes-without-markup/).
