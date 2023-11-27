const path = require('path')
const express = require('express')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
var bodyParser = require('body-parser')
const Company = require('./models/companyModel')
const Unit = require('./models/unitModel')
const viewRouter = require('./routes/viewRoutes')
const authRouter = require('./routes/authRoutes')
const authorizationRouter = require('./routes/authorizationRoutes')
const articleRoutes = require('./routes/articleRoutes')
const supplyRoutes = require('./routes/supplyRoutes')
const offertRoutes = require('./routes/offerRoutes')
const actionRoutes = require('./routes/actionRoutes')
const loyaltyCardRoutes = require('./routes/loyaltyCardRoutes')
const salesRoutes = require('./routes/salesRoutes')
const arcRoutes = require('./routes/arcRoutes')
const transferRoutes = require('./routes/transferRoutes')
const statisticRoutes = require('./routes/statisticRoutes')
const wagesRoutes = require('./routes/wagesRouter')
const cron = require('node-cron')
const moment = require('moment')
const Authorization = require('./models/authorizationModel')
const Thanadev = require('./models/thanadevModel')




const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

process.on('uncaughtException', function (err) {
  console.log('error:uncaughtException')
  console.error(err);
  // Do something to handle the error
});


const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json('application/json'))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))


app.use('/api/v1/wages', wagesRoutes)
app.use('/api/v1/statistic', statisticRoutes)
app.use('/api/v1/transfer', transferRoutes)
app.use('/api/v1/arc', arcRoutes)
app.use('/api/v1/sales', salesRoutes)
app.use('/api/v1/loyaltycard', loyaltyCardRoutes)
app.use('/api/v1/action', actionRoutes)
app.use('/api/v1/offert', offertRoutes)
app.use('/api/v1/supply', supplyRoutes)
app.use('/api/v1/article', articleRoutes)
app.use('/api/v1/authorization', authorizationRouter)
app.use('/api/v1/auth', authRouter)
app.use('/', viewRouter)


//app.use('/', clientRouter)
// app.use('/auth', authRouter)
// app.use('/agency', agencyRouter)
// app.use('/agent', agentRoutes)
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))

const createComp=async()=>{
  const compOnDb= await Company.findOne()
  const thana = await Thanadev.findOne()
  if(!compOnDb){
  const comp= await Company.create({company_name:'emri kompanis',address:'adresa',arbk:'123',phone_number:'0444444',email:'comp@gmail.com'})
  const unit = await Unit.create({unit_name:'emri njësis kryesore',address:'adresa',category:'company'})
  }
  if(!thana){
    await Thanadev.create({username:'thanadev',password:'thanaPass123'})
  }
}
cron.schedule('0 0 * * *',async()=>{
  try{
    const experationDate = moment().toDate()
    const auths = await Authorization.find({end_time_date:{$lte:experationDate}})
    let authIds = []
    for(let i = 0;i<auths.length;i++){
      authIds.push(auths[i]._id)
    }
    if(authIds.length>1){
      await Authorization.updateMany({_id:{$in:authIds}})
      await Unit.updateMany({_id:{$in:authIds}})
    }
    
    // const subscription = await Subscription.find({expires_at:{$lt:Date.now()},is_active:true})
    // const batchSize = 100
    // for (let i = 0; i < subscription.length; i += batchSize) {
    //   const batch = subscription.slice(i, i + batchSize);
    //   const subscription_ids = batch.map(sub => sub._id);
    //   const businesses_ids = batch.map(bis=>bis.business) 
    //   await Subscription.updateMany({ _id: { $in: subscription_ids } }, { $set: { is_active: false } });
    //   await Bussiness.updateMany({ _id: { $in: businesses_ids } }, { $set: { is_active: false } });
    // }
  }
  catch(e){
    console.log('Cron-error: ',e)
  }
  })
createComp()
app.listen(process.env.PORT, () => {
    console.log(`App running on port ${process.env.PORT}...`);
});
