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
};
