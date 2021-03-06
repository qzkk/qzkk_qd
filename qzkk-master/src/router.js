import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import SerchPerRegister from './views/manage/SerchPerRegister'
import PerRegistration from './views/manage/PerRegistration'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/manage/About.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('./views/Register.vue')
    },
    {
      path: '/manage',
      name: 'Manage',
      meta:{auth:true},
      component: () => import('./views/manage/Manage.vue'),
      children: [{
        name: 'home',
        path: '',
        component: () => import('./views/Home.vue'),
        meta: [],
      },{
          path: '/userList',
          component: () => import('./views/manage/UserList.vue'),
          meta: ['人员管理', '查看人员'],
      },{
        path: '/userVerify',
        component: () => import('./views/manage/UserVerify.vue'),
        meta: ['人员管理', '注册审核'],
      },{
        path: '/pr',
        name: 'PerRegistration',
        component: PerRegistration,
        meta: ['登记系统', '人员登记'],
      },{
        path: '/serchPR',
        name: 'SerchPerRegister',
        component: SerchPerRegister,
        meta: ['登记系统', '查看人员登记'],
      },{
        path: '/goodMessage',
        component: () => import('./views/manage/GoodMessage.vue'),
        meta: ['物资管理', '查看物资'],
      }
      ,{
        path: '/goodList',
        component: () => import('./views/manage/GoodList.vue'),
        meta: ['物资管理', '删除物资'],
      },{
        path: '/addgoods',
        component: () => import('./views/manage/AddGoods.vue'),
        meta: ['物资管理', '物资录入'],
      },{
        path: '/goodVerify',
        component: () => import('./views/manage/GoodVerify.vue'),
        meta: ['物资管理', '物资审核'],
      },{
        path: '/returnCheck',
        component: () => import('./views/manage/ReturnCheck.vue'),
        meta: ['物资管理', '归还审核'],
      },{
        path: '/teamList',
        component: () => import('./views/manage/TeamList.vue'),
        meta: ['小队管理', '查看小队'],
      },{
        path: '/limitsManage',
        component: () => import('./views/manage/LimitsManage.vue'),
        meta: ['权限管理'],
      },{
        path: '/teamVerify',
        component: () => import('./views/manage/TeamVerify.vue'),
        meta: ['小队管理', '小队审批'],
      }, {
        path: '/notice',
        component: () => import('./views/manage/Notice.vue'),
        meta: ['信息服务', '通知'],
      },{
        path: '/noticeDeliver',
        component: () => import('./views/manage/NoticeDeliver.vue'),
        meta: ['信息服务', '发布通知'],
      },{
        path: '/noticeVerify',
        component: () => import('./views/manage/NoticeVerify.vue'),
        meta: ['信息服务', '通知审核'],
      },{
        path: '/mapPosition',
        component: () => import('./views/manage/MapPosition.vue')
      },
        {
          path: '/examineTaskByManage',
          component: () => import('./views/manage/examineTaskByManage.vue'),
          meta: ['任务管理', '审批任务'],
        },
        {
          path: '/viewTaskByManage',
          component: () => import('./views/manage/viewTaskByManage.vue'),
          meta: ['人员管理', '查看任务'],
        },
        {
        path: '/demo',
        component: () => import('./views/demo.vue'),
        meta: [],
      }]
    },



    {
      path: '/captain',
      name: 'Captain',

      component: () => import('./views/captain/Captain.vue'),
      children: [
        {
          name: 'home',
          path: '',
          component: () => import('./views/Home.vue'),
          meta: [],
        },{
        path: '/memberlist',
        component: () => import('./views/captain/MemberList.vue'),
        meta: ['人员管理', '查看和删除队员'],
        },{
        path: '/mbeverify',
        component: () => import('./views/captain/MbeVerify.vue'),
        meta: ['人员管理', '审核队员'],
      },{
        path: '/viewgoods',
        component: () => import('./views/captain/ViewGoods.vue'),
        meta: ['物资管理','查看物资']
      },{
        path: '/aplygoods',
        component: () => import('./views/captain/AplyGoods.vue'),
        meta: ['物资管理','查看物资']
      }, {
        path: '/returngoods',
        component: () => import('./views/captain/ReturnGoods.vue'),
        meta: ['物资管理','归还物资']
      },{
          path: '/cnotic',
          component: () => import('./views/captain/CNotic.vue'),
          meta: ['信息服务','通知']

      },{
        path: '/sendnotic',
        component: () => import('./views/captain/SendNotic.vue'),
        meta:['信息服务','发布通知']
      },{
          path: '/creatteam',
          component: () => import('./views/captain/CreatTeam.vue'),
          meta:['团队管理','创建团队']
        },
        {
          path: '/AddMember',
          component: () => import('./views/captain/AddMember.vue'),
          meta: ['团队管理', '管理成员'],
        },
        {
          path: '/ManageGoods',
          component: () => import('./views/captain/ManageGoods.vue'),
          meta: ['管理物资', '物资管理'],
        },
        {
          path: '/ViewTask',
          component: () => import('./views/captain/ViewTask.vue'),
          meta: ['科考任务管理', '查看任务'],
        },
        {
          path: '/AplyTask',
          component: () => import('./views/captain/AplyTask.vue'),
          meta: ['科考任务管理', '申请任务'],
        },
        {
          path: '/DistributeTask',
          component: () => import('./views/captain/DistributeTask.vue'),
          meta: ['科考任务管理', '分配任务'],
        }
      ]
    },



    {
      name: 'Member',
      path: '/member',
      component: () => import('./views/teammember/Member.vue'),
      children: [{
        name: 'home',
        path: '',
        component: () => import('./views/Home.vue'),
        meta: [],
      }, {
          path: '/viewTaskByMember',
          component: () => import('./views/teammember/ViewTask.vue'),
          meta: ['任务管理','查看任务']
        },{
          path: '/teamListByMember',
          component: () => import('./views/teammember/TeamList.vue'),
          meta: ['团队管理','查看团队']
        },{
          path: '/applied',
          component: () => import('./views/teammember/Applied.vue'),
          meta: ['小队管理','已经申请']
        },{
        path: '/viewTeamInfo',
        component: () => import('./views/teammember/ViewTeamInfo.vue'),
        meta: ['小队管理','查看小队信息']
      },{
          path: '/message',
          component: () => import('./views/teammember/Message.vue'),
          meta: ['信息服务','通知']
        }
      ]
    },

    // {
    //   name: 'Base',
    //   path: '/base',
    //   component: () => import('./views/base/Base.vue'),
    //   children: [{
    //     name: 'home',
    //     path: '',
    //     component: () => import('./views/Home.vue'),
    //     meta: [],
    //   },{
    //       path: '/Base',
    //       component: () => import('./views/base/Base.vue'),
    //       meta: ['信息服务','通知']
    //     }, {
    //     path: '/viewTaskByBase',
    //     component: () => import('./views/base/ViewTask.vue'),
    //     meta: ['任务管理','查看任务']
    //   },{
    //     path: '/teamListByBase',
    //     component: () => import('./views/base/TeamList.vue'),
    //     meta: ['团队管理','查看团队']
    //   },{
    //     path: '/goodListByBase',
    //     component: () => import('./views/base/GoodList.vue'),
    //     meta: ['物资管理','查看物资']
    //   },{
    //     path: '/AddGoodsByBase',
    //     component: () => import('./views/base/AddGoods.vue'),
    //     meta: ['物资管理','物资录入']
    //   },{
    //     path: '/GoodVerifyByBase',
    //     component: () => import('./views/base/GoodVerify.vue'),
    //     meta: ['物资管理','物资审核']
    //   },{
    //       path: '/UserListByBase',
    //       component: () => import('./views/base/UserList.vue'),
    //       meta: ['人员管理','查看人员']
    //     }
    //   ]
    // },
    //
    // {
    //   name: 'Core',
    //   path: '/core',
    //   component: () => import('./views/core/Core.vue'),
    //   children: [{
    //     name: 'home',
    //     path: '',
    //     component: () => import('./views/Home.vue'),
    //     meta: [],
    //   }, {
    //       path: '/Base',
    //       component: () => import('./views/teammember/Message.vue'),
    //       meta: ['信息服务','通知']
    //     },{
    //     path: '/viewTaskByCore',
    //     component: () => import('./views/core/ViewTask.vue'),
    //     meta: ['任务管理','查看任务']
    //   },{
    //     path: '/examineTaskByCore',
    //     component: () => import('./views/core/examineTaskByCore.vue'),
    //     meta: ['任务管理','审核任务']
    //   },{
    //     path: '/TeamListByCore',
    //     component: () => import('./views/core/TeamList.vue'),
    //     meta: ['团队管理','查看团队']
    //   },
    //   ]
    // }


  ]
});

// router.beforeEach((to,from,next) => {
//
//   if(to.matched.some( m => m.meta.auth)){
//
//
//     if(store.state.isLogin=='100') {
//       next()
//     }
//   else{
//       next({path:'/login',query:{ Rurl: to.fullPath} })
//     }
//     }else{
//       next()
//     }
//   });

export default router;
