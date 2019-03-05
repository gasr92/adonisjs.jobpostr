'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

//Route.on('/').render('index')
Route.get('/', 'JobController.home');
//Route.on('/signup').render('auth.signup');

Route.on('/signup').render('auth.signup');
Route.post('/signup', 'UserController.create').validator('CreateUser');
Route.post('/login', 'UserController.login').validator('LoginUser');


Route.on('/login').render('auth.login');

Route.get('/logout', async ({ auth, response }) => {
    await auth.logout();
    return response.redirect('/');
});

Route.get('/post-a-job', 'JobController.userIndex');
// Route.get('/post-a-job/delete/:id', 'JobController.delete');
// Route.get('/post-a-job/edit/:id', 'JobController.edit');
// Route.post('/post-a-job/update/:id', 'JobController.update').validator('CreateJob');
//Route.post('/post-a-job', 'JobController.create').validator('CreateJob');

Route.group(() => {
    Route.get('/delete/:id', 'JobController.delete');
    Route.get('/edit/:id', 'JobController.edit');
    Route.post('/update/:id', 'JobController.update').validator('CreateJob');
    Route.post('/', 'JobController.create').validator('CreateJob');
}).prefix('/post-a-job');