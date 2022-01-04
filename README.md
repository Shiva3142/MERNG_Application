<h1>internship-assignment-submission-for-skelly</h1>
<h4>Created by : SHIKUMAR CHAUHAN</h4>
<p>NodeJS and ReactJS is used for this Assignment</p>
<br><br>

<h2>Folder Stucture</h2>
<ul>
    <li>
        -- Backend
        <ul>
            <li>GraphQL
                <ul>
                    <li>typeDef.js</li>
                    <li>resolvers.js</li>
                </ul>
            </li>
            <li>prisma
                <ul>
                    schema.prisma
                </ul>
            </li>
            <li>utils
                <ul>
                    <li>validate.js</li>
                    <li>auth-check.jsx</li>
                </ul>
            </li>
            <li>index.js</li>
            <li>package.json</li>
        </ul>
    </li>
    <li>
        -- Frontend
        <ul>
            <li>public</li>
            <li>src
                <ul>
                    <li>Componets
                        <ul>
                            <li>Home
                                <ul>
                                    <li>css
                                        <ul>
                                            Homepage.css
                                        </ul>
                                    </li>
                                    <li>HomePage.jsx</li>
                                    <li>Post.jsx</li>
                                    <li>PostForm.jsx</li>
                                    <li>PostsContainer.jsx</li>
                                </ul>
                            </li>
                        </ul>
                        <ul>
                            <li>Post
                                <ul>
                                    <li>css
                                        <ul>
                                            Postpage.css
                                        </ul>
                                    </li>
                                    <li>Comment.jsx</li>
                                    <li>Postpage.jsx</li>
                                </ul>
                            </li>
                        </ul>
                        <ul>
                            <li>Signup
                                <ul>
                                    <li>css
                                        <ul>
                                            Signup.css
                                        </ul>
                                    </li>
                                    <li>Login.jsx</li>
                                    <li>Register.jsx</li>
                                </ul>
                            </li>
                        </ul>
                        <ul>
                            <li>Account
                                <ul>
                                    <li>AccountPage.jsx</li>
                                </ul>
                            </li>
                        </ul>
                        <ul>
                            <li>templates
                                <ul>
                                    <li>Loder.jsx</li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li>GraphQL
                        <ul>
                            <li>graphql.jsx</li>
                        </ul>
                    </li>
                    <li>App.css</li>
                    <li>App.jsx</li>
                    <li>index.js</li>
                </ul>
            </li>
            <li>package.json</li>
        </ul>
    </li>
</ul>
<br><br>
<h3>Required things</h3>
<ul>
    <li>NodeJS Must be installed</li>
    <li>config.env file is needed to run application (in backend)</li>
</ul>
<h2>Steps to Setup at start</h2>
<ol>
    <li>Clone this repositary</li>
    <li>open the created Folder (named MERNG-Application)</li>
    <li>Now go to <em>backend</em> Folder and open <b>terminal</b> in that Folder</li>
    <li>run following command in <b>terminal</b></li>
    <ul>
        <li>--> npm install</li>
    </ul>
    <br>
    <li>Now go to <em>frontend</em> Folder and open <b>terminal</b> in that Folder</li>
    <li>run following command in <b>terminal</b></li>
    <ul>
        <li>--> npm install</li>
    </ul>
</ol>
<br><br>

<h2>Steps to run Assignment</h2>
<ol>
    <li>First go to <em>backend</em> Folder and open <b>terminal</b> in that Folder</li>
    <li>run following command in <b>terminal</b></li>
    <ul>
        <li>--> node app.js</li>
    </ul>
    <li>After server get started don't close the terminal</li>
    <br>
    <li>Now go to <em>frontend</em> Folder and open another <b>terminal</b> in that Folder</li>
    <li>and run following command in <b>terminal</b></li>
    <ul>
        <li>--> npm start</li>
    </ul>
    <li>Browser will open automatically or  go to Browser and type following address</li>
    <ul><li>
        http://127.0.0.1:3000
    </li></ul>
</ol>

<br>
<br>

# Fetures
<ol>
    <li>Created webpage is Responsive for desktop and mobile devices</li>
    <li>here users can Register,login, create Post, delete Post, like post, comment on post delete comment</li>
    <li>user's password is hashed for security purpose</li>
    <li>form validation is added</li>
</ol>
