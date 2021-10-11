# CZ2006-React-Native-App

## Development Info

* **Framework**: React Native with Expo

* **Language**: JavaScript (using function components)

* **Supported Platforms**: iOS, Android

## Important (!)

After cloning the repository, open the folder on VSCode. 
      
Then using the VSCode Explorer, navigate to node_modules/expo (note: '@expo' is different from 'expo' - you need to scroll down a bit in node_modules to find 'expo')  

Open the AppEntry.js file. Ensure that it contains the following code:

    import registerRootComponent from 'expo/build/launch/registerRootComponent';

    import DrawerNav from '../../src/navigation/DrawerNav';

    registerRootComponent(DrawerNav);

Then run the following commands one by one on the VSCode terminal  

      npm install

      expo start

This should open a new tab on your browser which displays a QR code. Use an emulator or your phone to run the app.

## File organization structure (for main code)

 &nbsp; &nbsp; |--- src  
 &nbsp; &nbsp; | &nbsp; &nbsp; |--- assets  
 &nbsp; &nbsp; | &nbsp; &nbsp; | &nbsp; &nbsp; |--- fonts  
 &nbsp; &nbsp; | &nbsp; &nbsp; | &nbsp; &nbsp; |--- images  
 &nbsp; &nbsp; | &nbsp; &nbsp; |--- components  
 &nbsp; &nbsp; | &nbsp; &nbsp; |--- navigation  
 &nbsp; &nbsp; | &nbsp; &nbsp; |--- screens  
 &nbsp; &nbsp; | &nbsp; &nbsp; |--- styles  
 &nbsp; &nbsp; | &nbsp; &nbsp; |--- utils  
    
#### Assets  
  Includes any fonts or images to be added in the application, like the app logo for example
  
#### Components  
  Includes any custom UI components like custom buttons 
  
#### Navigation  
  React-Navigation (an external standalone library) is used for navigation between different screens of the app. 
  There are different types of navigation, like drawer and stack navigation, which each require separate installation. 
  In this app, we've used both, and have made separate .js files for each navigation type (StackNav.js and DrawerNav.js)
  
#### Screens  
  The actual screens with which the user interacts are put under the "screens" folder.
  
#### Styles  
  UI components like views, text, buttons etc. use styles for design. These styles can be included in the same .js file as the actual components, or can be added 
  to a separate file. For now, the CpSearchScreen and SearchScreen styles have been added to a separate AppStyles.js file, but the WelcomeScreen and OTPScreen styles
  are in WelcomeScreen.js and OTPScreen.js respectively
  
#### Utils  
  Any highly reused code will be put here so all other files can access it. It currently contains all files that have to with databases or APIs.
  
  
## Current Flow of Events w/ Screens

**1. Login/Registration**  

 &nbsp; &nbsp; Screen 1: WelcomeScreen.js  
 &nbsp; &nbsp; User enters phone number, clicks continue, is redirected to OTPScreen   
 
 &nbsp; &nbsp; Screen 2: OTPScreen.js  
 &nbsp; &nbsp; User enters OTP sent to phone number, is redirected to CpSearchScreen upon OTP verification   
 
 &nbsp; &nbsp; ***Note: OTPScreen.js is currently being worked on***
   
     
**2. Search for Nearby Carparks**  

 &nbsp; &nbsp; Screen 1: CpSearchScreen.js  
 &nbsp; &nbsp; User clicks on search bar, is redirected to SearchScreen.js  
     
 &nbsp; &nbsp; Screen 2: SearchScreen.js  
 &nbsp; &nbsp; User enters address, app displays suggested addresses.  
 &nbsp; &nbsp; User clicks specific address, is redirected to CpSearchScreen 
 
 &nbsp; &nbsp; ***Note: CpSearchScreen.js will be the screen that displays the list of suggested carparks (to be implemented)***
  



