/*************************************************************************************************
 * Reddit Comment Auto-Upvoter
 * Designed for use in /r/hockey GameDay Threads
 * Adds prevention from upvoting a posts that has already been voted on.
 * @author yetanotherx <yetanotherx@gmail.com>
 ************************************************************************************************/
var runUpvote = function(delay, minscore) { 
	var runSingleUpvote = []; 
	$('.up').each(function() { /* Excludes comments that were already upvoted */
		var that = this; 
		var upvoteFunction = function() { 
			$(that).trigger('click'); 
			$(that).trigger('mouseup'); 
		}; 

		/* Long way to get the actual score of the comment, to determine if it shouldn't be upvoted. */
		var score = $(this).parent().parent().children(".entry").children(".noncollapsed").children(".tagline").children(".unvoted").text().replace(/ points/g, "");
		var scoreInt = parseInt(score);
		
		var hasDownvoted = $(this).parent().children(".downmod").length; /* Excludes comments that have been downvoted (.down is not downvoted, .downmod is downvoted) */
		var isTooLow = scoreInt != NaN && scoreInt < minscore;
		if( !hasDownvoted && !isTooLow ) {
			runSingleUpvote.push(upvoteFunction);
		} 
	});
	
	for( var counter = 1; counter <= runSingleUpvote.length; counter++ ) {
		window.setTimeout(function() {
			runSingleUpvote[counter - 1]();
		}, counter * delay);
	}
};

runUpvote(500, -3);
