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
