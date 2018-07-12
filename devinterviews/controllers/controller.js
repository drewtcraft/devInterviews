const model = require('../models/models.js')
const bcrypt = require('bcrypt')
const tokenService = require('../tokenService/tokenService.js')


module.exports = {

  getInterview(req, res, next){

    const id = req.params.id
    model.getInterviewByID(id)
      .then((interview)=>{
        console.log('getting to final controller.')

        res.locals.interview = interview
        next()
      })
      .catch((err)=>{
        console.log(err)
        next(err)
      })
  },

  getInterviewQuestions(req, res, next){

    const id = req.params.id
    model.getInterviewQuestions(id)
      .then((questions)=>{
        res.locals.questions = questions
        next()
      })
      .catch((err)=>{
        console.log('question fail')

        console.log(err)
        next(err)
      })
  },

  getInterviewTags(req, res, next){

    const id = req.params.id
    model.getInterviewTags(id)
      .then((tags)=>{
        console.log('tagattack!', tags)
        res.locals.tags = tags
        next()
      })
      .catch((err)=>{
        console.log('question fail')

        console.log(err)
        next(err)
      })
  },

  getInterviewComments(req, res, next){
    console.log('comments shit')
    const id = req.params.id
    model.getInterviewComments(id)
      .then((comments)=>{
        res.locals.comments = comments
        if(res.locals.vote_info){
        res.send({
          interview: {
          interview: res.locals.interview,
          questions: res.locals.questions,
          tags: res.locals.tags,
          comments: res.locals.comments
        },
        vote_info: res.locals.vote_info})}
      else {
        res.send({
        interview: res.locals.interview,
        questions: res.locals.questions,
        tags: res.locals.tags,
        comments: res.locals.comments
      })
      }
      })
      .catch((err)=>{
        console.log('controller fail')
        console.log(err)
        next(err)
      })
  },

  getAllInterviews(req, res, next){
    console.log('what?')
    model.getAllInterviews()
      .then((interviews)=>{
        res.locals.interviews = interviews
        if(req.body.user_id){
          console.log('user found')
        next()
      } else {
        console.log('user not found')
        res.json({interviews: interviews,
        tags: res.locals.tags})}
      })
      .catch((err)=>{
        console.log(err)
        next(err)
      })
  },

  postInterview(req, res, next){
    console.log(req.body)
    model.postInterview(req.body.interview)
      .then((id)=>{
        //store id for use in question posting
        res.locals.id = id
        next()
      })
      .catch((err)=>{
        console.log(err)
        next(err)
      })
  },

  async postQuestions(req, res, next){
    try {
    await req.body.questions.map((question)=>{
      question.id = res.locals.id
      question.username = req.body.interview.username
      console.log('posting question', question)

      model.postQuestion(question).catch((err)=>{console.log('dis', err)})})

    next()
  }
    catch(err) {
      console.log('andrew is a stupid bitch', err)
    }

  },

  async postTags(req, res, next){
    console.log('making it to tags')
    try{
      await req.body.tags.map((tag)=>{
        console.log(tag)
        model.postTag(tag)
          .then((id)=>{
            console.log('tag id is...', id, res.locals.id)
            model.updateTagsTable(id.id, res.locals.id.id).catch((err)=>{console.log('tagerr', err)})
          })
          .catch((err)=>{console.log('dis', err)})
      })
      res.json(res.locals.id)
    }
    catch(err){

    }
  },

  postComment(req, res, next){
    if(req.body.type === 'i'){
      model.postInterviewComment(req.body.comment)
        .then(()=>{
          res.end()
        })
        .catch((err)=>{
          console.log(err)
          next(err)
        })
    } else if (req.body.type === 'q'){
      console.log('shit fuck goddamnit')
      model.postQuestionComment(req.body.comment)
        .then(()=>{
          res.end()
        })
        .catch((err)=>{
          console.log(err)
          next(err)
        })
    }


  },

  handleInterviewVote(req, res, next){
    model.updateInterviewScore(req.body.type_id, res.locals.amount)
      .then(()=>{
        console.log('iv updated')
        res.send('working')
      })
      .catch((err)=>{
        console.log(err)
        next(err)
      })
  },

  handleQuestionVote(req, res, next){
    model.updateQuestionScore(req.body.type_id, res.locals.amount)
      .then(()=>{
        console.log('q updated')
        next()
      })
      .catch((err)=>{
        console.log(err)
        next(err)
      })
  },

  handleQuestionCommentVote(req, res, next){
    model.handleQuestionCommentVote(req.body.type_id, res.locals.amount)
      .then(()=>{
        console.log('q updated')
        next()
      })
      .catch((err)=>{
        console.log(err)
        next(err)
      })
  },

  handleInterviewCommentVote(req, res, next){
    model.updateInterviewCommentScore(req.body.type_id, res.locals.amount)
      .then(()=>{
        console.log('c updated')
        next()
      })
      .catch((err)=>{
        console.log(err)
        next(err)
      })
  },

  handleVote(req, res, next){


    console.log('entering handleVote', req.body)
    model.voteEntryExists(req.body)
      .then((data)=>{
        console.log('vote entry exists', req.body)

        //if the amount the user has selected is different from the stored amount
        if(data.amount != req.body.amount){

          res.locals.oldAmount = data.amount



          //update with stored amount
          console.log('amount is different, updating reqbody', req.body)

          model.updateVoteEntry(req.body)
            .then((data)=>{
              console.log('updating entry', data)


              if((res.locals.oldAmount + req.body.amount) === 0){
                console.log('difference of two!')
                req.body.amount = req.body.amount * 2
              } else if (req.body.amount === 0){
                req.body.amount =  -1 * res.locals.oldAmount
              }

              res.locals.amount = req.body.amount
              next()
            })
            .catch((err)=>{
              console.log(err)
              next(err)
            })
        }

          console.log('youre fucked')
          res.send('fuck')

      })
      .catch((err)=>{
        console.log(err)
        model.addVoteEntry(req.body)
          .then((data)=>{
            console.log('adding entry', data.amount)
            res.locals.amount = data.amount
            next()
          })
          .catch((err)=>{
            next(err)
          })
      })

  },

  getUsersVotesOnInterviews(req, res, next){

    console.log('making it here')

    model.getUsersVotesOnInterviews(req.body.user_id)
      .then((vote_info)=>{
          console.log('and now here')
        res.send({
          interviews: res.locals.interviews,
          vote_info: vote_info,
          tags: res.locals.tags
        })
      })
      .catch((err)=>{
        console.log(err)
        next(err)

      })
  },

  getVotesOnInterviewComments(req, res, next){
    model.getVotesOnInterviewComments(req.body.user_id)
      .then((votes)=>{
        console.log('out of model')
        res.locals.vote_info = votes
        next()
      })
      .catch((err)=>{
        console.log(err)
        next(err)

      })

  },

   accountExists(req, res, next){

      model.findUserByUsername(req.body.username)
        .then(()=>{
          res.send('username taken')
        })
        .catch((err)=>{
          model.findUserByEmail(req.body.email)
            .then(()=>{
              res.send('email taken')
            })
            .catch((err)=>{
              next()
            })
        })

  },

  async register(req, res, next){

    console.log('hitting register')
    console.log(req.body)

    try {

      req.body.hashword = await bcrypt.hash(req.body.password, 5)

      console.log('hashword', req.body.hashword)

      const userInfo = await model.register(req.body)

      console.log(userInfo)

      const token = await tokenService.makeToken(userInfo)

      res.send(token)

    }
    catch(err){}
    console.log(err)
  },

  async login(req, res, next) {
     console.log('getting to the goddamn function')
       try {
           console.log('login',req.body)
           const { username, password } = req.body;

           const user = await model.findUser(username);
           const valid = await bcrypt.compare(password, user.hashword);

           if(!valid) {
               throw { message : 'wrong password'}
           }

          const token = await tokenService.makeToken({username: username, user_id: user.id})

          res.send(token)

       } catch (err) {
         console.log('failed to authenticate', err)
           next(err);
       }
},

  getUsersVotesOnQuestions(req, res, next){
    model.getUsersVotesOnQuestions(req.params.id)
  },

  isUserLoggedIn(req, res, next) {
    console.log('this one', req.body.token)
    res.send(tokenService.verify(req.body.token))
    },

    getAllQuestions(req, res, next){
      model.getAllQuestions()
        .then((questions)=>{

          res.locals.questions = questions

          if(req.body.user_id){
            console.log('user found')
          next()
        } else {
          console.log('user not found')
          res.json({questions: questions})}

        })
        .catch((err)=>{
          console.log(err)
          next(err)
        })
    },

    getAllUserVotesOnQuestions(req, res, next){
      model.getAllUserVotesOnQuestions(req.body.user_id)
        .then((vote_info)=>{
            console.log('and now here')
          res.send({
            questions: res.locals.questions,
            vote_info: vote_info
          })
        })
        .catch((err)=>{
          console.log(err)
          next(err)

        })
    },

    getOneQuestion(req, res, next){
      console.log('getting one question')
      model.getOneQuestion(req.params.id)
        .then((question)=>{
          res.locals.question = question
          next()
        })
        .catch((err)=>{
          console.log(err)
          next(err)
        })
    },

    getCommentsForQuestion(req, res, next){
      console.log('getting comments')

      model.getCommentsForQuestion(req.params.id)
        .then((comments)=>{
          if(req.body.user_id){
          res.locals.comments = comments
          next()
        }
        else{
          res.json({
            question: res.locals.question,
            comments: res.locals.comments
          })
        }
        })
        .catch((err)=>{
          console.log(err)
          next(err)
        })
    },

    getAllUserVotesOnQuestionComments(req, res, next){
      console.log('getting votes')

      model.getAllUserVotesOnQuestionComments(req.body.user_id, req.params.id)
        .then((vote_info)=>{
          res.json(  res.json({
              question: res.locals.question,
              comments: res.locals.comments,
              vote_info: vote_info
            }))
        })
    },

    getTags(req, res, next){
      console.log(
        'GETTING THE TAGS'
      )
      model.getTags()
        .then((tags)=>{
          res.locals.tags = tags
          next()
        })
        .catch((err)=>{
          console.log(err)
          next(err)
        })
    },

    editInterview(req, res, next){
      console.log('look out homie', req.body)
      model.editInterview(req.body.interview)
      .then(()=>{
        res.end()
      })
      .catch((err)=>{
        console.log(err)
        next(err)
      })
    },

    editQuestionsForInterview(req, res, next){
      model.getInterviewQuestions(req.body.interview.id)
      .then((questions)=>{
        let ids = req.body.questions.map((q)=>{return q.id})
        let newQuestions = req.body.questions.filter((el, i)=>{
          if(ids.indexOf(el.id) === -1){
            return el
          }
        })
        let incomingIDS = req.body.map((q)=>{return q.id})
        let questionsToDelete = ids.filter((id)=>{
          if(incomingIDS.indexOf(id) === -1){
            return id
          }
        })

        questionsToDelete.forEach((id)=>{
          model.deleteQuestion(id).catch((err)=>{console.log('dis', err)})
        })


        newQuestions.forEach((q)=>{
          model.postQuestion(question).catch((err)=>{console.log('dis', err)})})
        })

    },

    deleteInterview(req, res, next){
      model.deleteInterview(req.params.id)
        .then(()=>{
          res.end()
        })
        .catch((err)=>{
        console.log(err)
        next(err)
      })
    }




}
