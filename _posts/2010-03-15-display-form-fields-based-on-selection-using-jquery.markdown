---
author: admin
comments: true
date: 2010-03-15 02:59:52+00:00
layout: post
slug: display-form-fields-based-on-selection-using-jquery
title: Display Form Fields Based on Selection Using JQuery
wordpress_id: 395
categories:
- JavaScript
- JQuery
- web-development
tags:
- html forms jquery
---

This is a simple method of showing and hiding form elements based on the user's selection. [It's based on this article](http://minneapolis.craigslist.org/ram/tag/1642880912.html) with a couple of very minor changes. (Dare I say, improvements?) I'm going to assume you've already included the JQuery library so I won't cover that here. I want to go straight to the code. ([View the example page here](http://anthonygthomas.com/examples/jquery-display-forms.html).)

First, the form:
{% highlight html linenos %}
	<form id="ExampleForm" method="post" action="#">
		<fieldset>
			<legend>Questionnaire</legend>
			<div class="input select">
				<label for="select1">Choose 1 to make the next select list appear.</label>
				<select name="select1" id="select1">
					<option value="">(choose one)</option>
					<option value="0">0</option>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
					<option value="4">4</option>
					<option value="5">5</option>
					<option value="6">6</option>
					<option value="7">7</option>
				</select>
			</div>
			<div class="hide" id="hide1"><!-- this select box will be hidden at first -->
				<div class="input select">
					<label for="select2">Select "Yes" to make the next option appear.</label>
					<select name="select2" id="select2">
						<option value="">(choose one)</option>
						<option value="1">Yes</option>
						<option value="0">No</option>
						<option value="3">Don&#039;t Know</option>
					</select>
				</div>
			</div>
			<div class="hide" id="hide2"> <!-- this one will also be hidden at first. -->
				<div class="input select">
					<label for="select3">This is the last question.</label>
					<select name="select3" id="select3">
						<option value="">(choose one)</option>
						<option value="0">0</option>
						<option value="1">1</option>
						<option value="2">2 to 5</option>
						<option value="3">6 to 10</option>
						<option value="4">&gt;10</option>
					</select>
				</div>
			</div>
		</fieldset>
		<div class="submit">
			<input type="submit" value="Save Answers" />
		</div>
	</form>
{% endhighlight %}

Now make sure your "hide" css class is hidden:

{% highlight css linenos %}
.hide {
	display:none;
}
{% endhighlight %}

Now with the wonderful elegance of JQuery, we'll tell the browser to display the hidden divs based on the user's selection:

{% highlight javascript linenos %}
$(document).ready(function(){
	$("#select1").change(function(){

		if ($(this).val() == "1" ) {

			$("#hide1").slideDown("fast"); //Slide Down Effect

		} else {

			$("#hide1").slideUp("fast");	//Slide Up Effect

		}
	});

	$("#select2").change(function(){

		if ($(this).val() == "1" ) {

			$("#hide2").slideDown("fast"); //Slide Down Effect

		} else {

			$("#hide2").slideUp("fast");	//Slide Up Effect

		}
	});
});
{% endhighlight %}

Let's look at what's happening here. First, we have a form with select boxes with ids "select1", "select2" and "select3". The last two are hidden by enclosing them in a div with our "hide" class. (Incidentally, Blueprint provides a "hide" class for you if you use that framework.)

Next we tell JQuery that as soon as "select1" is changed, we need to evaluate the new value. In this case, if the new value is "1", we want to display the div with the id "hide1" [using JQuery's slideDown effect](http://api.jquery.com/slideDown/). We do this with [JQuery's change event](http://api.jquery.com/change/).

{% highlight javascript linenos %}
$("#select1").change(function(){ // when #select1 changes

		if ($(this).val() == "1" ) { // see if the new value is "1"

			$(".hide1").slideDown("fast"); // if it is "1", display the .hide1 div with the slideDown effect

		} else {

			$(".hide1").slideUp("fast");	//otherwise, hide it with the slideUp effect

		}
	});
{% endhighlight %}

Once "select2" is displayed, we can evaluate it to see if we need to display "select3" which is in a div with a "hide" class and "hide2" id.

{% highlight javascript linenos %}
$("#select2").change(function(){ // once select2 is changed

		if ($(this).val() == "1" ) { // see if the new value is "1"

			$(".hide2").slideDown("fast"); // if it is, display the hide2 div using slideDown

		} else {

			$(".hide2").slideUp("fast");	// otherwise hide it using slideUp

		}
	});
{% endhighlight %}

Remarkably simple really. [Review the working example and code here](http://anthonygthomas.com/examples/jquery-display-forms.html).

**Update (March 15, 2010)**

You also could show/hide a single form element by id rather than enclose them in a div. I enclosed them in a div 1.) so I could hide the label and 2.) because in my application where I use this solution, I'm actually hiding a whole group of fields.


### Resources
	
  * [JQuery change() Event](http://api.jquery.com/change/)
  * [JQuery val()](http://api.jquery.com/val/)
  * [JQuery slideDown Effect](http://api.jquery.com/slideDown/)
  * [JQuery slideUp Effect](http://api.jquery.com/slideUp/)
