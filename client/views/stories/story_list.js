// incrementLimit = function() {
// 	newLimit = Session.get('limit') + 5;
// 	Session.set('limit', newLimit);
// }

Template.storyList.created = function(){
	// Session.setDefault('limit', 5);

	// // Deps.autorun(function() {
	// // 	Meteor.subscribe('publishedStories', Session.get('limit'));
	// // });
}


Template.storyList.rendered = function(){
	Meteor.defer(function(){
		$('.user-story').removeClass('off-page');
	})

	// $(window).scroll(function() {
	//     if ($(window).scrollTop() + $(window).height() > $(document).height()) {
	// 	      incrementLimit();
	//     }
	// });
}

Template.storyList.events({
	'click .get-started-link': function(e){
		GAnalytics.event("landing","get started","click");
	}
})

Template.storyList.helpers({
	// stories: function(){
	// 	return Stories.find({ }, { limit: Session.get('limit'), sort: {publishedOn: -1}});
	// },
	randomEmojis: function(){
		var emojis = _.map(_.sample(_.filter(Meteor.emojis(), function(emoji){
				return _.indexOf(['places', 'other'], emoji.category) == -1; 
			}), 5), 
			function(emoji){
				return {shortname: emoji.shortname, category: emoji.category};
			});

		return emojis;
	},
	noUser: function(){
		if (!Meteor.userId())
			return true
	}
});

// Template.storyListExcerpt.rendered = function(){
// 	this.$('.user-story').removeClass('off-page');
// }


Template.storyListExcerpt.events({
	'click .story-link': function(e){
		e.preventDefault();
		var stories = $('.user-story');
		var target = $(e.currentTarget);
		var url = target.attr('href');

		_.each(stories, function(story, index){
			Meteor.setTimeout(function(){
				$(story).velocity({
					opacity: 0,
					translateY: 30,
				});
			}, 100);
		});

		$('.welcome-section').velocity({
			opacity: 0
		});

		$('.story-list-section').velocity({
			opacity: 0
		})

		Meteor.setTimeout(function(){
			Router.go(url);
		}, 600);
	}
});

Template.storyListExcerpt.helpers({
	publishedOnDate: function(){
		if (this.publishedOn)
			return moment(this.publishedOn).format('MMM D');
		else 
			return moment(this.createdOn).format('MMM D');
	},
	publishedOnYear: function(){
		if (this.publishedOn)
			return moment(this.publishedOn).format('YYYY');
		else 
			return moment(this.createdOn).format('YYYY');
	},
	textExcerpt: function(){
		if (this.text.length > 140){
			return this.text.substr(0, 140) + '...'
		} else {
			return this.text;
		}
	}
})