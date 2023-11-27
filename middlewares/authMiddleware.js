const User = require('../models/userModel')
const Thanadev = require('../models/thanadevModel')
const jwt = require('jsonwebtoken')

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt
  if (token) {
    jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
      if (err) {
        res.redirect('/')
      } else {
        let user = await User.findById(decodedToken.id)
        let thana = await Thanadev.findById(decodedToken.id)
        if (!user && !thana) {
          return res.redirect('/login')
        }
        if (user) {
          req.user = user
          res.locals.user = user
        }
        if (thana) {
          req.thana = thana
          res.locals.thana = thana
        }
        next()
      }
    })
  } else {
    res.redirect('/')
  }
}

function authRole(role) {
  return (req, res, next) => {
    if(!req.user){
    const token = req.cookies.jwt
    if (token) {
      jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
        if (decodedToken) {
          let user = await User.findById(decodedToken.id)
          if (user) {
            if (role.includes(user.role)) {
              next()
            } else {
              res.redirect('back')
            }
          } else {
            res.redirect('back')
          }
        } else {
          res.redirect('back')
        }
      })
    } else {
      res.redirect('back')
    }
  }else{
    if (role.includes(req.user.role)) {
      next()
    }else{
      res.redirect('back')
    }
  }
}

}




const checkUser = async (req, res, next) => {
  //Meta cookie
  // res.locals.seoTags = await SeoTags.findOne()

  const token = req.cookies.jwt
  if (token) {
    jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null
        next()
      } else {
        let user = await User.findById(decodedToken.id)
        if (user) {
          res.locals.user = user
          next()
        } else {
          res.locals.user = null
          next()
        }
      }
    })
  } else {
    res.locals.user = null
    next()
  }
}

const checkLogin = (req, res, next) => {
  const token = req.cookies.jwt
  if (token) {
    jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
      if (err) {
        return next()
      }
      const user = await User.findById(decodedToken.id)
      const thana = await User.findById(decodedToken.id)
      if (!user && !thana) {
        return next()
      } else {
        if (user && user.role === 'superadmin') {
          return res.redirect('/admin/index')
        }
        if( user && user.role === 'pos') {
          return res.redirect('/pos/index')
        }
      
        if ( user && user.role === 'managment') {
          const accesses = {
            "cash_register": false,
            "stock": false,
            "actions": false,
            "offerts": false,
            "supply": false,
            "intern_exhange": false,
            "article": false,
            "clients": false,
            "workers": false,
            "company": false,
            "partners":false,
            "statistic":false,
            "sales_many":false,
          }
          const accessArr = user.access.split(',')
          for (var i = 0; i < accessArr.length; i++) {
            accesses[accessArr[i]] = true
          }
          if (accesses.statistic) {
            return res.redirect('/admin/statistic-general')
          }
          if (accesses.sales_many) {
            return res.redirect('/admin/sales-wholesale')
          }
          if (accesses.cash_register) {
            return res.redirect('/admin/arc')
          }
          if (accesses.stock) {
            return res.redirect('/admin/stock')
          }
          if (accesses.actions) {
            return res.redirect('/admin/shares')
          }
          if (accesses.offerts) {
            return res.redirect('/admin/offers')
          }
          if (accesses.supply) {
            return res.redirect('/admin/supplies')
          }
          if (accesses.intern_exhange) {
            return res.redirect('/admin/internal-moves')
          }
          if (accesses.article) {
            return res.redirect('/admin/articles')
          }
          if (accesses.clients) {
            return res.redirect('/admin/clients')
          }
          if (accesses.workers) {
            return res.redirect('/admin/workers')
          }
          if (accesses.company) {
            return res.redirect('/admin/company')
          }
          if (accesses.partners) {
            return res.redirect('/admin/partners')
          }
        }
        if( user && user.role === 'counter') {
          return res.redirect('/admin/worker-stock-count')
        }
        if(thana){
          return res.redirect('/admin/thana-dev')
        }
       
      }
    })
  } else {
    next()
  }
}

const accessStaff = (access) => {
  return (req, res, next) => {
    if (req.user || req.thana) {
      if (req.user&&req.user.role === 'superadmin') {
        return next()
      }
      if (req.thana) {
        return next()
      }
      if (req.user&& req.user.role === 'pos' || req.user.role==='managment' || req.user.role==='counter') {
        if(access ==='arc' && req.user&&req.user.role==='managment'){
          return next()
        }
        if (req.user.access.includes(access)) {
          return next()
        } else {
          return res.redirect('back')
        }
      } else {
        return res.redirect('back')
      }
    } else {
      return res.redirect('back')
    }
  }
}
const accessThana= () => {
  return (req, res, next) => {
    console.log
    if (req.thana) {
        return next()
    } else {
      return res.redirect('back')
    }
  }
}

// Define the API key validation middleware


module.exports = {
  requireAuth,
  authRole,
  checkUser,
  checkLogin,
  accessStaff,
  accessThana
}
