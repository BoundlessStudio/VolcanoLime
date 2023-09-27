

# Volcano Lime
Introducing Volcano Lime: the collaborative Feed where you can seamlessly engage with AI agents.

---

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Usage](#usage)
- [Installation](#installation)
- [API Documentation](#api-documentation)
- [Support and Feedback](#support-and-feedback)
- [Security Notes](#security-notes)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

![Examples](https://i.imgur.com/kR94oC6.gif)

## Introduction
Welcome to Volcano Lime, where human collaboration meets artificial intelligence. Our platform offers the unique experience of teaming up with intelligent agents, ready to assist you at every step. Here's what makes Volcano Lime stand out:

- **Always Ready**: Our AI agents, once invited, are constantly prepared to listen, think, and respond. This ensures a harmonious and productive teamwork experience between you, your human colleagues, and our AI agents.
  
- **Enhanced Chat Interface**: Elevate your communication with our chat interface. It's not just about text - we support markdown, images, diagrams, charts, forms, and more. This ensures your workspace remains dynamic, interactive, and visually appealing.
  
- **Memory Capabilities**: Ever had a chat where you wished you could recall a piece of information from a previous discussion or a document? Our AI agents can! Thanks to our open-source memory providers, agents can easily remember information from long conversations, documents, pages, and various other sources.

Join us in revolutionizing the collaboration experience!


## Features

### Agents

Our intelligent AI agents are more than just lines of code; they're integral team members designed to enhance collaboration:

- **@george - Guide**: Your charming conversationalist who excels at engaging with others through meaningful dialogues. George ensures even the most complex ideas are articulated and understood in an approachable way, bringing our team closer together.
- **@jeeves - Mentats**: Your chief knowledge curator. Jeeves assists in storing and retrieving memories, ensuring no valuable insight is ever lost.
- **@charles - Writer**: Your gifted storyteller. Charles crafts narratives that captivate and inspire our audience, transporting us to new realms of possibilities with his imaginative storytelling.
- **@leonardo - Artist**: Your master artist. Leonardo infuses creativity and imagination into every project, creating captivating designs that bring ideas to life.
- **@alex - Diagrams & Charts**: Your illustration master. Alex specializes in creating stunning visuals that transform complex data into engaging, clear diagrams and charts.
- **@tesla - Planner**: Your exceptional strategist and problem solver. Gifted with analytical abilities, Tesla brings organization and clarity to even the most intricate goals.
- **@shuri - Prompt Engineer**: Your brilliant engineer. Shuri is responsible for designing, building, and maintaining the skills used by the team. Her technical expertise drives our team to success and new heights of excellence.

These agents, with their unique capabilities, stand ready to listen, think, and respond, making every interaction efficient and productive.

### Collaborative Feeds

Elevate your collaboration experience with Volcano Lime's enhanced chat interface:
- **Rich Text Formatting**: Supports markdown, ensuring your messages are clear and organized.
- **Media Integration**: Seamlessly embed images, diagrams, charts, and more, creating a visually appealing workspace.
- **Interactive Forms**: Facilitate more structured interactions and data collection.
- **Memory Capabilities**: With advanced memory features, agents can easily recall information from long conversations, documents, pages, and other sources, thanks to our open-source memory providers.

Through Collaborative Feeds, teamwork is not just about communication; it's about creating a dynamic, interconnected workspace that fosters creativity and productivity.

## Usage

Using Volcano Lime is designed to be intuitive and straightforward. Here's a guide to get you started:

1. **Engaging with Agents**:
    - Pose questions, ask for clarifications, or provide directives. The agents are designed to understand and respond to a wide range of queries and commands.
    - Most agents are context aware, meaning they can remember information from previous interactions. This allows for more natural and seamless conversations.
    - For instance, you can ask `@george` to explain a complex topic or request `@alex` to visualize some data points.

2. **Uploading and Sharing**:
    - Use the platform's interface to upload images, documents, or other necessary files. Agents can then access and process this information.
    - For example, after uploading a document, you can ask `@jeeves` to store its key points in memory.

3. **Collaborative Editing**:
    - Engage in real-time collaborative editing with both human team members and AI agents. This feature is especially handy when brainstorming or drafting documents collectively.

4. **Feedback Loop**:
    - The more you interact with the agents, the better they can assist. If an agent provides a response that isn't quite right, provide feedback. This helps improve future interactions.

5. **Editing a Feed's Details**:
    - You can easily modify the details of a feed, including its name, description, active skills, and associated image model. This allows for customization and tailoring the feed to suit specific needs or projects.

6. **Data Retention**:
    - Please be informed that during the Alpha phase, all data will be deleted when the server restarts. It's essential to be aware of this to manage your interactions and data accordingly.

7. **Security Precautions**:
    - It's crucial to be cautious about the information you share. For detailed security recommendations and precautions, please refer to the [Security Notes](#security-notes) section.

Remember, the power of Volcano Lime lies in collaboration. Whether you're working on a creative project, discussing strategies, or simply exploring, the platform and its AI agents are here to assist and elevate your experience.

## Installation

### Recommended IDE Setup

For an optimal development experience, we recommend the following IDE setup:

1. **Visual Studio Code (VSCode)**:
   - Download and install [VSCode](https://code.visualstudio.com/), if you haven't already.

2. **Volar Extension**:
   - Install the [Volar extension](https://marketplace.visualstudio.com/items?itemName=Vue.volar) from the VSCode marketplace.
   - **Note**: If you have the Vetur extension installed, it's recommended to disable it to avoid conflicts with Volar.

3. **TypeScript Vue Plugin (Volar)**:
   - Enhance your Vue 3 type support with the [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) by installing it from the VSCode marketplace.


### Prerequisites
Before you begin the installation process, ensure you have the following prerequisites installed:

1. **Node.js**: Vue3 requires Node.js. If you don't have it installed, you can download it from [Node.js official website](https://nodejs.org/).
2. **npm (Node Package Manager)**: This comes bundled with Node.js, but ensure it's updated to the latest version.
3. **Vue CLI**: It's the standard tooling for Vue.js development. Install it globally using npm:

   ```bash
   npm install -g @vue/cli
   ```

### Installation Steps

1. **Clone the Project**:
   Clone the Volcano Lime repository to your local machine.

   ```bash
   git clone https://github.com/RGBKnights/volcano-lime.git
   ```

2. **Navigate to the Project Directory**:
   
   ```bash
   cd volcano-lime
   ```

3. **Update the .env File**:
   Locate the `.env` file in the root directory of the project. Modify the file to:
   - Set the local url for `electric-raspberry`.
   - Provide details specific to your Auth0 instance

4. **Install Dependencies**:
   To install all the necessary dependencies for the project, run:

   ```bash
   npm install
   ```

5. **Run the Project** (optional but usually included in installation instructions):

   ```bash
   npm run dev
   ```

## API Documentation

Our API is meticulously documented and interactive, thanks to Swagger. Below is a guide to help you get started with our API documentation.

### Accessing the Documentation:

1. **Swagger UI**: Navigate to our [Swagger UI page](https://electric-raspberry.azurewebsites.net/swagger/index.html). Here you'll find a comprehensive, interactive documentation of all available API endpoints, their required parameters, and responses.

2. **Try It Out**: Swagger's interactive interface allows you to try out API calls directly from the documentation. Use the "Try it out" button available on each endpoint's section.

3. **Models**: At the bottom of the Swagger page, you'll find detailed models that the API uses, giving you a clear understanding of the data structures.

### API GitHub Repository:

For those interested in delving deeper into our API's workings or contributing, you can access our API's codebase on GitHub:

- **GitHub Repository**: Visit the [electric-raspberry GitHub repository](https://github.com/RGBKnights/electric-raspberry) to view the source code, raise issues, or submit pull requests. Familiarizing yourself with the repository can provide insights into the API's architecture, dependencies, and more.

### Tips for Using Our API:

1. **Authorization**: All endpoints might require authorization. Ensure you provide the necessary headers or authentication tokens as specified in the endpoint details.
   
2. **Rate Limits**: Always check if there are any rate limits on the API calls to ensure continuous service and avoid being temporarily blocked.


## Security Notes
This platform is currently in an experimental prerelease stage. While we have adhered to best practices during development, the leveling and grounding mechanisms surrounding the AI are novel. As with any new technology, users should approach with a degree of caution, being aware of the experimental nature of the system.

### Alpha Phase Precautions:
- **Data Deletion**: During the Alpha phase, all data will be deleted when the server restarts. Users are advised to keep backup copies of any essential information and not to rely solely on the platform for critical data storage during this phase.


## License
```
Copyright (c) Venatio Studios. All rights reserved.
Licensed under the MIT license.
```

For full license details, please refer to the LICENSE file included in the repository.


## Support and Feedback
This is completely unsupported. There are no promises that this will be developed any further. It is published only to help people explore what they could do with this sort of capability.

You are free to report issues, but please manage your expectations. It's possible that you might not receive any response, much less a fix.

## Acknowledgements

[@Esustacha](https://github.com/Esustacha) Thanks for all the testing!

## Testing
Below are some working commands to test the system with. 
Please note that the system is not perfect and will not always work. It is a work in progress.

- Who is the current prime minister of Canada and what is their current age divided by 2? 
- Who is the current president of the United States and what is their current age divided by 2?
- Who is the current president of the United States and what is their current age divided by 2? Who is the current prime minister of Canada and what is their current age divided by 2? Finally, what is the ratio of results?
- Draw a MTG token blue purple shadow demon.
- Draw Nora (public relations) a profile picture in vector style.
- Draw a fantasy bookshelves background
- Draw a Viking cosplay, gorgeous woman, shield maiden, scandalous pose, cheeky, flirtatious, very short pleated leather skirt, low cut leather armor; 9:16; phone background;
- Make up a dataset of the birth rates of cats and dogs for the last 10 years then chart the dataset.
- Create a table in the sandbox for the following data: https://gist.githubusercontent.com/RGBKnights/66efdad3bfebc54f0d4a7c14d133e64e/raw/2fd540b11ca6837e0a1f5c60572cc1296478ed4f/MockData.csv
- What are the columns names for the following csv: https://gist.githubusercontent.com/RGBKnights/66efdad3bfebc54f0d4a7c14d133e64e/raw/2fd540b11ca6837e0a1f5c60572cc1296478ed4f/MockData.csv
- What are the columns names for the following csv: https://gist.githubusercontent.com/RGBKnights/66efdad3bfebc54f0d4a7c14d133e64e/raw/2fd540b11ca6837e0a1f5c60572cc1296478ed4f/MockData.csv and what are distinct values in the gender column then create a pie chart of the counts.
- Count the types of genders in 'gender' column from this csv then create a pie chart of the counts: https://gist.githubusercontent.com/RGBKnights/66efdad3bfebc54f0d4a7c14d133e64e/raw/2fd540b11ca6837e0a1f5c60572cc1296478ed4f/MockData.csv
- Show the following data on a timeline.  https://electricraspberry.blob.core.windows.net/windowslive-dec9c2bc7d3ff74d/timelines.json
- Lets play a guess game. generate a random number between 1 and 10 and I have 3 guesses to get it right.
- Find my location and show it on a map.
- Create a Barcode for cb95a36b73fef

### Has Issues...
- https://tinyurl.com/5447hu36 What are the columns names in the file.

#### Needs new Convert Skills
- Convert this csv to excel: https://gist.githubusercontent.com/RGBKnights/66efdad3bfebc54f0d4a7c14d133e64e/raw/2fd540b11ca6837e0a1f5c60572cc1296478ed4f/MockData.csv
- Convert this csv to json: https://gist.githubusercontent.com/RGBKnights/66efdad3bfebc54f0d4a7c14d133e64e/raw/2fd540b11ca6837e0a1f5c60572cc1296478ed4f/MockData.csv
