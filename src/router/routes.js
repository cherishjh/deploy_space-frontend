

const routes = [
  {
    path: '/',
    component: () => import('pages/main/HomePage.vue')
  }
  ,
  {
    path: '/MyPage',
    component: () => import('pages/main/MyPage.vue')
  }
  ,
  {
    path: '/MySpace/:SpaceType',
    component: () => import('pages/space/SpaceCompo.vue'),
    props: true

  },
  {
    path: '/TeamSpace/:SpaceType',
    component: () => import('pages/space/SpaceCompo.vue'),
    props: true
  },
  {
    path: '/GroupSpace/:SpaceType',
    component: () => import('pages/space/SpaceCompo.vue'),
    props: true
  },
  {
    path: '/SpaceCreate/:SpaceType',
    name:'SpaceCreate',
    component: () => import('pages/space/CreateSpaceCompo.vue'),
    props: true
  },
  // {
  //   path: '/Kanban',
  //   component: () => import('pages/schedule/KanbanPage.vue')
  // },
  // {
  //   path: '/Calendar',
  //   component: () => import('pages/schedule/CalendarPage.vue')
  // },
  {
    path: '/Messages',
    component: () => import('pages/chat/MessagesPage.vue')
  },
  {
    path: '/Register',
    component: () => import('pages/main/RegisterPage.vue')
  },
  {
    path: '/oauth2/redirect', component: () => import('components/shared/OAuthRedirect.vue')
  },
  {
    path: '/chatlist',
    component: () => import('pages/chat/ChatListPage.vue'),
    props: route => ({ chatRoomId: '0830cbde-7394-472d-9bb6-ba5a533057f9' })
  },
  // {
  //   //
  //   path: '/chatlist/:chatRoomId',
  //   component: () => import('pages/chat/ChatListPage.vue'),
  //   props: true
  // }

  {
    path: '/PostEditor',
    component: ()=> import('pages/post/PostEditor.vue')
  },
  {
    path: '/PostList',
    component: ()=> import('pages/post/PostList.vue')
  },
  {
    path: '/PostDetail/:postId',
    name:'PostDetail',
    component: () => import('pages/post/PostDetail.vue'),
    props: true
  },


]

export default routes
