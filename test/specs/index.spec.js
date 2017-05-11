import { expect } from 'chai';

import MainPage from './pages/MainPage';
import SignupPage from './pages/SignupPage'
import models from '../../models';

describe('Main page', function () {
    before(function () {
        let quests = [
            {title: 'FirstQuest', description: 'no description'},
            {title: 'SecondQuest', description: 'second description'},
            {title: 'ThirdQuest', description: 'really long long long long long long long long long long long long long long long long long long long long long long long long long description'},
            {title: 'FourthQuest', description: 'no description'},
            {title: 'FifthQuest', description: 'no description'},
            {title: 'SixthQuest', description: 'no description'},
        ];
        models.Quest.truncate().then(() => models.Quest.bulkCreate(quests));
    });

    it('should have banner', function () {
        const mainPage = new MainPage(browser);
        mainPage.open();
        const title = mainPage.getTitle();

        expect(title).to.equal('we are effective team');
    });

    it('should move to sign in', function () {
        const mainPage = new MainPage(browser);
        mainPage.open();
        mainPage.goToSignIn();
    });

    it('should go to sign up', function (){
        const mainPage = new MainPage(browser);
        mainPage.open();

        mainPage.goToSignUp();
        const signUpPage = new SignupPage(browser);
        signUpPage.loginInput.setValue('user');
        signUpPage.passwordInput.setValue('qwer');
        signUpPage.loginButton.click();
    });

    it('should correctly search quests', function () {
        const mainPage = new MainPage(browser);
        mainPage.open();
        mainPage.refresh();

        mainPage.waitQuests(6);
        mainPage.waitQuestTitle(0, 'FirstQuest');
        mainPage.waitQuestDescription(0, 'no description');

        mainPage.searchQuests('f');
        mainPage.waitQuests(3);
        mainPage.getQuests(3).every(x => x.title.startsWith('f'));

        mainPage.searchQuests('s');
        mainPage.waitQuests(2);
        mainPage.getQuests(2).every(x => x.title.startsWith('s'));
    });

    it('should go to quest page', function () {
        const mainPage = new MainPage(browser);
        mainPage.open();

        mainPage.waitQuests(1);
        const questPage = mainPage.goToQuest(0);
        questPage.refresh();
        questPage.waitTitle('Квест FirstQuest');
        questPage.waitDescription('Описание: no description');
        questPage.waitAuthor('Автор: имя автора');
    });
});
