# Simple Task CRUD App - Angular Frontend with SpringBoot (Java) Backend
Application to demonstrate various parts of a service oriented RESTfull application.
<h3>Technology Stack</h3>
<table>
<th>Component</th><th>Technology</th>
<tr>
<td>Backend (REST)</td><td>SpringBoot (Java)</td>
</tr>
<tr>
<td>Frontend</td><td>Angular 4+</td>
</tr>
<tr>
<td>REST Documentation</td><td>Swagger UI</td>
</tr>
<tr>
<td>REST Spec</td><td>Open API Standard</td>
</tr>
<tr>
<td>Database</td><td>SQLite</td>
</tr>
<tr>
<td>Persistence</td><td>JPA (Using Spring Data)</td>
</tr>
<tr>
<td>Client Build Tools</td><td>angular-cli, Webpack, npm</td>
</tr>
<tr>
<td>Server Build Tools</td><td>Maven(Java) </td>
</tr>
</table>
<h3>Folder Structure</h3>
<pre>
PROJECT_FOLDER
│  README.md
│  pom.xml           
│  mytaskdb.db          #database file
└──[src]      
│  └──[main]      
│     └──[java]      
│     └──[resources]
│        │          
│        └──application.properties  #contains springboot configurations 
│
└──[webui]
   │  package.json
   |  proxy.conf.json    #configure the Angular CLI to proxy API calls to backend server.
   │  angular-cli.json   #ng build configurations
   └──[node_modules]
   └──[src]              #frontend source files
</pre>
<h3>Prerequisites</h3>
Ensure you have this installed before proceeding further
<ul>
<li>Java 8</li>
<li>Maven 3.3.9+</li>
<li>Node 6.0 or above</li>
<li>npm 4 or above</li>
<li>Angular-cli</li>
</ul>
<h3>About</h3>
This is an RESTfull implementation of a simple task app. The goal of the project is to
<ul>
<li>Highlight techniques of making and securing a REST full app using SpringBoot</li>
<li>How to consume an RESTfull service and make an HTML5 based Single Page App using Angular 4+</li>
</ul>
<h3>Install Frontend</h3>
<pre>
# Navigate to PROJECT_FOLDER/webui (should cntain package.json )
npm install
</pre>
<h3>Install Backend (SpringBoot Java)</h3>
<pre>
# Maven Build : Navigate to the root folder where pom.xml is present 
mvn clean install
</pre>
<h3>Start the API and Webui server</h3>
<p>For API</p>
<pre>
java -jar ./target/task-1.0.jar
</pre>
<p>For Angular app</p>
<pre>
npm start
</pre>
<h3>Accessing Application</h3>
<table>
<th>Component</th><th>URL</th>
<tr><td>Frontend</td><td>http://localhost:4200</td></tr>
<tr><td>Swagger (API Ref)</td><td>http://localhost:8080/swagger-ui.html</td></tr>
</table>
<h3>Screenshots</h3>
<p><strong>Task App</strong></p>
<img width="1015" alt="task-app" src="https://user-images.githubusercontent.com/1982291/27088427-354f4a72-508a-11e7-8601-7147be5d3cee.png">
<p><strong>API Docs</strong></p>
<img width="1004" alt="swagger" src="https://user-images.githubusercontent.com/1982291/27088462-4aba2170-508a-11e7-91cb-b86a798aa8fa.png">
