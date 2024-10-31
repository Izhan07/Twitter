import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {LoginPage,UserProfile,Search,Followers,Following,Home,Profile, Explore,CreateTweet,SignupPage,UpdateDetails,ChangeAvatar,ChangeCover,ChangeCredentials, Post} from "./components/Pages/index.js"
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import AuthLayout from "./components/AuthLayout.jsx"
import { Logout, StoryCont, GetStory, GetUserStory,StoryUpload, SideBar  } from './components/index.js'
import MessagedProfiles from './components/MessageComponents/MessagedProfiles.jsx'
import Chats from './components/MessageComponents/Chats.jsx'



const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
      {
        path:"/login",
        element: 
        <AuthLayout authentication ={false}>
          <LoginPage/>
        </AuthLayout>
      },
      {
        path:"/logout",
        element:
        <AuthLayout authentication>
          <Logout/>
        </AuthLayout>
      },
     
      {
        path:"/",
        element: 
        <AuthLayout authentication>
          <SideBar/>
          <Home/>
        </AuthLayout>
      },
      {
        path: "/signup",
        element:
        <AuthLayout authentication = {false}>
           <SignupPage/>
        </AuthLayout>
      },
      {
        path: "/Userprofile",
        element: 
        <AuthLayout authentication>
           <SideBar/>
          <UserProfile/>
        </AuthLayout>
      },
      {
        path: "/followers",
        element: 
        <AuthLayout authentication>
          <SideBar/>
          <Followers/>
        </AuthLayout>
      },
      {
        path: "/following",
        element: 
        <AuthLayout authentication>
          <SideBar/>
          <Following/>
        </AuthLayout>
      },
      {
        path: "/search",
        element: 
        <AuthLayout authentication>
           <SideBar/>
          <Search/>
        </AuthLayout>
      },
      {
        path: "/profile",
        element: 
        <AuthLayout authentication>
           <SideBar/>
          <Profile/>
        </AuthLayout>
      },
      {
        path: "/explore",
        element: 
        <AuthLayout authentication>
           <SideBar/>
          <Explore/>
        </AuthLayout>
      },
      {
        path: "/createPost",
        element: 
        <AuthLayout authentication>
           <SideBar/>
          <CreateTweet/>
        </AuthLayout>
      },
      {
        path: "/story",
        element:
        <AuthLayout authentication>
         
          <StoryCont/>
        </AuthLayout>
      },
      {
        path: "/GetStory",
        element: 
        <AuthLayout authentication>
          <GetStory/>
        </AuthLayout>
      },
      {
        path: "/userStory",
        element:
        <AuthLayout authentication>
          <GetUserStory/>
        </AuthLayout>
      },
      {
        path: "/storyUpload",
        element: 
        <AuthLayout authentication>
          <SideBar/>
          <StoryUpload/>
        </AuthLayout>
      },
      {
        path:"/messages",
        element:
        <AuthLayout authentication>
           <SideBar/>
          <MessagedProfiles/>
        </AuthLayout>
      },
      {
        path: "/chats",
        element:
        <AuthLayout authentication>
           <SideBar/>
          <Chats/>
        </AuthLayout>
      },
      {
        path: "/updateAvatar",
        element:
        <AuthLayout authentication>
          <SideBar/>
          <ChangeAvatar/>
        </AuthLayout>
      },
      {
        path: "/updateCover",
        element:
        <AuthLayout authentication>
          <SideBar/>
          <ChangeCover/>
        </AuthLayout>
      },
      {
        path: "/changeCredantials",
        element:
        <AuthLayout authentication>
          <SideBar/>
          <ChangeCredentials/>
        </AuthLayout>
      },
      {
        path: "/updateDetails",
        element:
        <AuthLayout authentication>
          <SideBar/>
          <UpdateDetails/>
        </AuthLayout>
      },
      {
        path: "/post/:id",
        element:
        <AuthLayout authentication>
          <SideBar/>
         <Post/>
        </AuthLayout>
      }
      
    ]
  }
])

createRoot(document.getElementById('root')).render(
 
   <Provider store={store}>
   <RouterProvider router={router}/>
   </Provider>
 
)
