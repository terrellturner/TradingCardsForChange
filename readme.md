# Trading Cards For Change (TC4C)

![Trading Cards For Change Banner](https://raw.githubusercontent.com/terrellturner/TradingCardsForChange/main/frontend/public/images/logo/TC4C-Text-Logo.svg)

Hello! My name is Terrell, and this is my cornerstone Github repo. **Trading Cards for Change** (or **TC4C** for short) is an approximation of most use cases an event-based charity might run into, leveraging the power of the MERN stack to provide a custom solution without the painful fees from bigger reservation services. This e-commerce platform allows admins to track the event creation and management process while giving customers an easy way to view and purchase reservations for a given event. This project represents everything I've learned over **four years** of being a freelance web developer, serving as my "trial by fire" in the fundamentals of each technology listed. I laughed, cried, and probably bled a little too. Most importantly, I learned **a lot** and continue to apply this knowledge in everything else webdev-related.

## What is Trading Cards for Change?

Trading Cards For Change began as a response to a real, local charity's need for an e-commerce platform that didn't have the stinging fees associated with the most prominent event/reservation services online. Though the goal of that specific endeavor has changed, the idea behind TC4C hasn't - people who are trying to change the world for the better shouldn't have to pay anymore than they have to.

Enter: the MERN stack. TC4C has everything you expect out of a functional e-commerce platform like a shopping cart, easily-accessible and clear view of products being sold, and a responsive admin panel with lots of functionality.

The project began with a need, and so I set out to solve that need. The original project came from the Traversy Media course "MERN Stack From Scratch", which taught me so very much more about back-end development than I ever knew was possible. However, due to the fact that this original project was written with CRA and Bootstrap, I felt that was my cue to instead rebuild it all from scratch using **Vite** and **Tailwind** as I've used them on almost every other major project I've worked on. Applying what I had already been taught in the course was easy - what I severely underestimated was adapting this in a way that could cover as many edge cases as possible for a real, working business. If they were to direct all of their sales through this site, it had to be robust and independent.

## The Build Process

Having built React sites in the past, this was my first time having to dive deep into the docs to learn as much as possible in order to not only make something that worked, but something that made sense as well. React, Express, and Node are all extremely established in their respective roles and are the technologies I learned the most about through this whole project.

I decided to stick with MERN due to the time budget I had set for this project. While it would have been nice to dive into PostgreSQL implementations, the goal was to have a working MVP as quickly as possible. Given the massive amount of MongoDB/Mongoose support online due to its ubiquity, the decision to stick with MERN couldn't have been clearer.

### Front-end:

*   **React & Vite:** My go-to combo. I love Vite, as do many, many other fellow developers. React's appeal is hard to deny, even with the amazing advancements in other frameworks.

*   **Tailwind CSS & Component Architecture:** Solidifying my knowledge about functional components and how best to break any webpage down into corresponding components is an ongoing learning process for me. This project provided ample opportunity to practice writing concise, effective Tailwind components, a skill I intend to continue refining.

*   **Motion:** After doing a lot of research, I found that the recently-renamed Motion would be the best library for both desktop and mobile animations. Things I had heard about it before turned out to be right, as it's quite a slick tool for not only simple animations but providing a framework for more complex animations using `AnimatePresence` and animation variants.

*   **Redux Toolkit & RTK Query:** Managing application-wide state (`userInfo`, `cartItems`, admin data) and orchestrating asynchronous data fetching with caching and invalidation proved to be the most complex aspect of the frontend. Redux Toolkit, with `createSlice` (for `authSlice`, `cartSlice`, etc.) and RTK Query's `createApi` (for `usersApiSlice`), provided a sturdy framework. Successfully wiring up complex actions, like the `logoutHandler` involving multiple dispatches (`logout()`, `clearCart()`) and navigation, was nothing short of a eureka moment every time.

*   **React Router DOM:** Implementing routing using `Link`, `useNavigate`, and `HashLink` (for smooth scrolling to page sections like `#events`) was a relatively straightforward process.

### Challenges & "Character-Building" Opportunities:

*   **Scope Creep:** The thorn in the side of this project, though some scope creep (like the calendar) turned out to be vital aspects of the website. When I was working on making this as production-ready as possible, my dialogue with those most involved with the charity produced different results quite often. It seemed like the amount of edge cases and user stories were endless. Either I would think of something they hadn't, or vice versa. The result was an amazing, albeit very delayed, project lifecycle.

*   **State Management Complexity:** Ensuring consistent state across components (user authentication status, cart contents, admin privileges) required meticulous planning and debugging, with Redux DevTools being an indispensable tool.

*   **Async Operations & Side Effects:** Implementing robust asynchronous operations, such as the user logout sequence involving an API call (`apiLogout`), multiple Redux action dispatches, and client-side navigation, while also handling potential errors gracefully, demanded careful orchestration.

*   **UI Interaction Details:** Fine-tuning subtle UI interactions, like the desktop user dropdown menu's hover behavior (managing `onMouseEnter`, `onMouseLeave`, and `setTimeout` via `closeMenuTimeRef.current` to prevent flickering or premature closing), often required more iteration than initially anticipated.

## Key Features:

*   **User Authentication:** Comprehensive user authentication (signup, login, logout) with session management handled via Redux.

*   **Dynamic Event/Product Listings:** Clear presentation of available events or products for user browsing.

*   **Shopping Cart Functionality:** Standard e-commerce cart for adding event reservations or products, including dynamic item count display (`cartItems.reduce(...)`).
*   **User Profiles:** Dedicated user profile pages (e.g., `/user/:id`) for account management.

*   **Admin Dashboard:**
    *   Order Log (`/admin/orders`)
    *   Edit Events/Products (`/admin/products`)
    *   Manage Users (`/admin/users`)
*   **Responsive Design:** A lot of effort went into making it usable on desktop and mobile, leveraging Tailwind's responsive prefixes and that hamburger menu.

## Tech Stack:

*   **Frontend:**
    *   React (with Hooks: `useState`, `useRef`, etc.)
    *   Vite (as the build tool)
    *   Redux Toolkit (for state management, including `authSlice`, `cartSlice`)
    *   RTK Query (part of Redux Toolkit, for data fetching, e.g., `usersApiSlice`)
    *   React Router DOM (`Link`, `useNavigate`, `HashLink`)
    *   Framer Motion (for UI animations and transitions)
    *   Tailwind CSS (for styling)
    *   React Icons (Font Awesome for those handy `FaUser`, `FaShoppingCart` icons)
*   **Backend:**
    *   Node.js
    *   Express.js
*   **Database:**
    *   MongoDB

## Achievements:
*   **Redux Integration:** State management libraries are a huge level-up for me. Fetching data is one thing, but sending data is something else. Having to build this out was as challenging as it was rewarding. I love thinking about the other kinds of projects I could create an MVP for when I'm making all the cogs click.

*   **The User Experience (UX) Details:** The power of Redux is one thing, but controlling when that cache is invalidated in my slices was truly next level. Learning about tags just about made my week when I realized it was that easy to keep data on the page up to date.

**Animation:** Something I'm still playing with as I polish the project, the possibilities of what can be done with Motion is incredible. I'm working in more and more animations as I learn how to orchestrate API and state changes in a graceful way on-screen. 

*   **Component Reusability (Mostly!):** Despite still having a lot of room to grow, I'm learning more and more how to break big static pages down into components that make sense. Some places in the project might be begging for encapsulation while there might be too much in other areas, but I think this project made me much more confident to create meaningful React components (especially in the scope of a full-stack application).

## How I Climbed This Mountain (And Future Plans):

*   **Initial Redux/RTK Query Setup:** This is was an amazing learning experience that gives me ideas for future projects even as I write this readme. Despite the many headaches I've suffered over things like CORS requests via API slices or when to appropriately use component state vs. Redux state, learning about the history of Redux and the complexity of libraries like Immer that allow me to write things that directly mutate without having to tiptoe around immutability. Learning these concepts, out of everything else, was the most significant "step up" in my technical ability I've experienced so far in my web development journey.

*   **Tailwind CSS:** Solidifying my knowledge about functional components and how best to break any webpage down into corresponding components is an ongoing learning process for me. During this, I've learned a great deal about writing more concise Tailwind components which I intend to apply to this project even after this first version is published.

*   **Comprehensive Error Handling:** Basic defensive `try..catch` statements are my sword-and-board (**especially** when things go haywire), but (along with testing as written below) this is something I'm also actively charting out in an actionable to-do list for TC4C's future.

*   **"For Change", But For Real:** Even though the project stands as an MVP I'm proud of, it doesn't reflect the mission of what this project's identity is based on. A future goal for this project would be to refine it to the point where it can be a FOSS alternative for charities that need something functional without big platform fees. Existing as a DIY alternative for burgeoning charities could enable even more people to establish a serious web presence that **they own**.

*   **More Animations & UI Polish:** Polish is the name of the game. After the MVP, this is one of the most important future priorities (coupled with accessibility features to disable all animations).

*   **TESTING!** Vitest was almost something I officially integrated into the project midway through when I felt comfortable enough with it, but sadly I decided against it when I ran into a series of problems coming up with the `react-big-calendar` component. This is something that will be part of even the smallest of projects with complicated logic, especially any API work.

*   **And the Bugs!** Bugs, bugs, bugs. Even though **most** of the show-stopping bugs were squashed when "production-ready" was a priority, there are still many UX bugs that are high up on the immediate "future polish" list.

## Getting Started (If you're brave enough to run this locally):

1.  **Clone the repo:**
    ```bash
    git clone https://github.com/terrellturner/TradingCardsForChange.git 
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd TradingCards4Change
    ```
3.  **Install Backend Dependencies:**
    ```bash
    cd backend
    npm install
    # or
    # yarn install
    cd ..
    ```
4.  **Install Frontend Dependencies:**
    ```bash
    cd frontend
    npm install
    # or
    yarn install
    cd ..
    ```
4. 5.  **Set up Environment Variables:**
    *   In the `TradingCards4Change/backend` directory, create a `.env` file. You can use `backend/.env.example` (to be created) as a template. It will require variables like `MONGO_URI`, `JWT_SECRET`, `NODE_ENV`, `PORT`.

    *   In the `TradingCards4Change/frontend` directory, create a `.env` file. You can use `frontend/.env.example` (to be created) as a template. It will likely require `VITE_API_URL` pointing to your backend.

6.  **Run the Backend Server:**
    ```bash
    cd backend
    npm run server 
    # Or your equivalent script to start the backend (e.g., npm run dev)
    cd ..
    ```
    *   Make sure that your MongoDB instance is running and accessible by the backend.
7.  **Run the Frontend Dev Server:**
    ```bash
    cd frontend
    npm run dev
    # or
    yarn dev
    ```

## A Final Word (For Now!)

This project has been a fantastic, sometimes frustrating, but ultimately incredibly rewarding learning experience. It really pushed me out of my comfort zone with complex state management, modern frontend tooling, and trying to build something that feels like a complete application.

There were many moments of wanting to throw my hands up in the air and take up underwater basket weaving instead, but seeing features like the user authentication flow or the animated mobile menu finally click into place made it all worthwhile. I have a newfound respect for how much work goes into even seemingly simple web applications, and even more ideas for apps that go even further than what I've done here.

I'm excited to keep chipping away at TC4C, refining its features, squashing those inevitable bugs, and hopefully realizing an even more complete application "For Change" to spread even further. 🙌

Thanks for checking it out, and **thank you even more for reading this far**! Any feedback or suggestions are welcome.

-T.A.
