import { Given, When, Then } from "@cucumber/cucumber";
import AddUserPage from "../../pages/addUserPage";
import { fixture } from "../../hooks/pageFixture";
import Assert from "../../helper/wrapper/assert";
import * as data from "../../helper/util/test-data/addUser.json";

let addUserPage: AddUserPage;
let assert: Assert;
let username: string;
const toBeDeletedUser = data.deletedUser;

Given('I open the webtables page', async function () {
    addUserPage = new AddUserPage(fixture.page);
    assert = new Assert(fixture.page);
    await addUserPage.navigateToAddUserPage();
});

When('I add a new user', async function () {
    await addUserPage.clickAddUser();
    username = data.userName + Date.now().toString();
    await addUserPage.addUser(data.firstName, data.lastName,
        username, data.password, "16", data.email, data.mobile);
});

When('I delete a user', async function () {
    // Write code here that turns the phrase above into concrete actions
    
    await addUserPage.deleteUser(toBeDeletedUser);
  });

Then('I confirm the user has been added', async function () {
    await addUserPage.validateUser(username);
    
});

Then('I confirm the user has been deleted', async function () {
    // Write code here that turns the phrase above into concrete actions
    await addUserPage.validateUserIsDeleted(toBeDeletedUser);
  });