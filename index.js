"use strict";
var globalLeaderboard = 'global';
var leaderboardIds = [
    globalLeaderboard,
];
var InitModule = function (ctx, logger, nk, initializer) {
    // Set up leaderboards.
    var authoritative = false;
    var metadata = {};
    var scoreOperator = "best" /* nkruntime.Operator.BEST */;
    var sortOrder = "descending" /* nkruntime.SortOrder.DESCENDING */;
    var resetSchedule = null;
    leaderboardIds.forEach(function (id) {
        nk.leaderboardCreate(id, authoritative, sortOrder, scoreOperator, resetSchedule, metadata);
        logger.info('leaderboard %q created', id);
    });
    initializer.registerRtAfter("MatchmakerAdd", afterMatchmakerAdd);
};
var afterAddFriendsFn = function (ctx, logger, nk, data, request) {
    var subject = JSON.stringify("A new friend!");
    var content = { reward: 1000 };
    var code = 1;
    var senderId = null; // Server sent
    var persistent = true;
    nk.notificationSend(ctx.userId, subject, content, code, senderId, persistent);
};
var afterMatchmakerAdd = function (ctx, logger, nk) {
    var subject = JSON.stringify("A User Is Waiting You To Join!");
    var content = { message: "Join it" };
    var code = 1;
    var senderId = null; // Server sent
    var persistent = false;
    nk.notificationSend(ctx.userId, subject, content, code, senderId, persistent);
};
