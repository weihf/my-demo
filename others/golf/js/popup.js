$(function() {
	$(".freeapply").bind("click", function() {
		$(".applyForm").show();
	})
	$("#applyClose").bind("click", function() {
		$(".applyForm").hide();
	})
	$(".apply").bind("click", function() {
		$(".applyForm").hide();
		$("#secApply").show();
	})
	$("#secClose,.isee").bind("click", function() {
		$("#secApply").hide();
	})
})