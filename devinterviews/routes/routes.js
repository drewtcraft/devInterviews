const express = require('express')
const router = express.Router()
const controller = require('../controllers/controller.js')



router.route('/interview/:id')
  .get(
    controller.getInterview,
    controller.getInterviewQuestions,
    controller.getInterviewTags,
    controller.getInterviewComments)
  .post(
    controller.handleVote,
    controller.handleInterviewVote
  )
  .put(controller.editInterview)
  .delete(controller.deleteInterview)

router.route('/interviewWithVotes/:id')
  .post(
    controller.getVotesOnInterviewComments,
    controller.getInterview,
    controller.getInterviewQuestions,
    controller.getInterviewTags,
    controller.getInterviewComments)

router.route('/question/:id')
  .post(
    controller.handleVote,
    controller.handleQuestionVote
  )

router.route('/comment/:id')
  .post(
    controller.handleVote,
    controller.handleInterviewCommentVote
  )


router.route('/questions/:id')
  .get(controller.getOneQuestion,
      controller.getCommentsForQuestion)
  .post(controller.getOneQuestion,
    controller.getCommentsForQuestion,
      controller.getAllUserVotesOnQuestionComments)

router.route('/sorted/:id')

router.route('/questionComments')
  .post(controller.handleVote,
  controller.handleQuestionCommentVote)


router.route('/questions')
  .get(controller.getAllQuestions)
  .post(controller.getAllQuestions,
        controller.getAllUserVotesOnQuestions)

router.route('/interviews')
  .get(
    controller.getTags,
    controller.getAllInterviews
  )
  .post(
    controller.getTags,
    controller.getAllInterviews,
    controller.getUsersVotesOnInterviews
  )

router.route('/login')
  .post(controller.login)

router.route('/register')
  .post(
    controller.accountExists,
    controller.register
  )

router.route('/token')
  .post(controller.isUserLoggedIn)


router.route('/interview')
  .post(
    controller.postInterview,
    controller.postQuestions,
    controller.postTags
  )


router.route('/comment')
  .post(
    controller.postComment
  )


module.exports=router
