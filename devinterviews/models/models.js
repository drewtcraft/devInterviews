const pg = require('pg-promise')();
const model = require('../config/dbConfig.js');
const db = pg(model);

  module.exports = {
    getInterviewByID(id){
      return db.one(`
        SELECT * FROM interviews
        WHERE id = ${id}

        `)
    },
    getInterviewQuestions(id){
      return db.any(`
        SELECT * FROM questions
        WHERE interview_id = ${id}
        ORDER BY score DESC
        `)
    },
    getInterviewComments(id){
      return db.any(`
        SELECT * FROM interview_comments
        WHERE interview_id = ${id}
        `)
    },
    getAllInterviews(){
      return db.any(`
        SELECT id, title, username, position, summary, score
        FROM interviews
        `)
    },
    postInterview(interview){
      console.log(interview)
      return db.one(`
        INSERT INTO interviews (
          user_id,
          title,
          username,
          position,
          industry,
          summary,
          score
        ) VALUES (
          $/user_id/,
          $/title/,
          $/username/,
          $/position/,
          $/industry/,
          $/summary/,
          $/score/
        ) RETURNING id
        `, interview)
    },

    postQuestion(question){
      console.log('making it to question model', question)
      return db.none(`
        INSERT INTO questions (
          interview_id,
          username,
          title,
          content
        ) VALUES (
          $/id.id/,
          $/username/,
          $/question/,
          $/answer/
        )
        `, question)
    },

    postInterviewComment(comment){
      return db.none(`
        INSERT INTO interview_comments (
          interview_id,
          user_id,
          username,
          title,
          content
        ) VALUES (
          $/type_id/,
          $/user_id/,
          $/username/,
          $/title/,
          $/content/
        )
        `, comment)
    },

    postQuestionComment(comment){
      return db.none(`
        INSERT INTO question_comments (
          question_id,
          user_id,
          username,
          title,
          content
        ) VALUES (
          $/type_id/,
          $/user_id/,
          $/username/,
          $/title/,
          $/content/
        )
        `, comment)
    },

    updateInterviewScore(id, amount){
      return db.none(`
        UPDATE interviews SET
        score = score + ${amount}
        WHERE id = ${id}
        `)
    },

    updateQuestionScore(id, amount){
      return db.none(`
        UPDATE questions SET
        score = score + ${amount}
        WHERE id = ${id}
        `)
    },

    handleQuestionCommentVote(id, amount){
      return db.none(`
        UPDATE question_comments SET
        score = score + ${amount}
        WHERE id = ${id}
        `)
    },

    updateInterviewCommentScore(id, amount){
      return db.none(`
        UPDATE interview_comments SET
        score = score + ${amount}
        WHERE id = ${id}
        `)
    },

    deleteFromVoteTracker(body){
      return db.any(`
        DELETE FROM vote_tracker
        WHERE user_id = $/user_id/ AND
        type = $/type/ AND type_id = $/type_id/
        RETURNING user_id
        `, body)
    },

    updateVoteEntry(body){
      return db.one(`
        UPDATE vote_tracker SET
        amount = $/amount/
        WHERE user_id = $/user_id/ AND
        type = $/type/ AND type_id = $/type_id/
        RETURNING amount
        `, body)
    },

    addVoteEntry(body){
      return db.one(`
        INSERT INTO vote_tracker (
        user_id, type, type_id, amount)
        VALUES ($/user_id/, $/type/, $/type_id/, $/amount/)
        RETURNING amount
        `, body)
    },

    //return user's posts on interviews
    getUsersVotesOnInterviews(user){
      return db.any(`
        SELECT * FROM vote_tracker
        WHERE type = 'i' AND user_id = $1
        `, user)
    },

    voteEntryExists(body){
      return db.one(`
        SELECT amount FROM vote_tracker
        WHERE user_id = $/user_id/ AND
        type = $/type/ AND type_id = $/type_id/
        `, body)
    },

    getUsersVotesOnQuestions(){
      return db.any(`
        SELECT * FROM vote_tracker
        WHERE type = 'i' AND user_id = $1
        `, user)
    },


    register(body){
      return db.one(`
        INSERT INTO users (username, name, email, hashword)
        VALUES ($/username/, $/name/, $/email/, $/hashword/)
        RETURNING id, username
        `, body)
    },

    findUser(username){
      return db.one(`
        SELECT * FROM users
        WHERE username = $1
        `, username)
    },

    findUserByEmail(email){
      return db.one(`
        SELECT * FROM users
        WHERE email = $1
        `, email)
    },
    findUserByUsername(username){
      return db.one(`
        SELECT * FROM users
        WHERE username = $1
        `, username)
    },

    getVotesOnInterviewComments(user_id){
      console.log('hitting model')
      return db.any(`
        SELECT * FROM vote_tracker
        WHERE user_id = $1 AND
        type = 'c'
        `, user_id)
    },

    getAllQuestions(){
      return db.any(`
        SELECT * FROM questions
        `)
    },

    getAllUserVotesOnQuestions(user_id){
      return db.any(`
        SELECT * FROM vote_tracker
        WHERE type = 'q' AND
        user_id = $1
        `, user_id)
    },

    getOneQuestion(id){
      return db.one(`
        SELECT * FROM questions
        WHERE id = $1`, id)
    },

    getCommentsForQuestion(id){
      return db.any(`
        SELECT * FROM question_comments
        WHERE question_id = $1
        `, id)
    },

    getAllUserVotesOnQuestionComments(user_id, question_id){
      return db.any(`
        SELECT * FROM vote_tracker
        WHERE type = 'qc' AND user_id = ${user_id}
        `)
    },

    postTag(tag){
      return db.one(`
        INSERT INTO tags (name)
        VALUES ($1) ON CONFLICT (name)
        DO UPDATE SET score = excluded.score + 1
        WHERE excluded.name = $1
        RETURNING id
        `, tag)
    },

    updateTagsTable(tag_id, interview_id){
      return db.none(`
        INSERT INTO interviews_tags (interview_id, tag_id)
        VALUES (${interview_id}, ${tag_id})
        `)
    },

    getInterviewTags(interview_id){
      return db.any(`
        SELECT tags.name FROM tags
        JOIN interviews_tags ON (tags.id = interviews_tags.tag_id)
        WHERE interviews_tags.interview_id = $1
        `, interview_id)
    },
    getTags(){
      return db.any(`
        SELECT * FROM tags
        LIMIT 10
        `)
    },
    deleteInterview(id){
      return db.none(`
        DELETE FROM interviews WHERE id = ${id}
        `)
    },
    editInterview(body){
      return db.none(`
        UPDATE interviews SET
        title = $/title/,
        position = $/position/,
        industry = $/industry/,
        summary = $/summary/
        WHERE id = $/id/
        `, body)
    },
    deleteQuestion(id){
      return db.none(`
        DELETE FROM questions WHERE id = ${id}`)
    }




  }
