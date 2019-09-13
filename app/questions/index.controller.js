(function () {
    'use strict';

    angular
        .module('app')
        .controller('Questions.IndexController', Controller);

    function Controller(QuestionService, FlashService, UserService) {
        var vm = this;

        vm.question = null;
        vm.user = null;
        vm.saveQuestions = saveQuestions;
        vm.questionList = [];
        //vm.deleteUser = deleteUser;

        initController();

        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
            });
        }

        function getAll() {
            QuestionService.GetAll(vm.user._id)
                .then(function (list) {
                    vm.questionList = list;
                    FlashService.Success('Questão inserida');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }

        function saveQuestions() {
            debugger;
            let questionToBeSaved = {
                question: vm.question,
                userId: vm.user._id
            }
            QuestionService.Create(questionToBeSaved)
                .then(function () {
                    FlashService.Success('Questão inserida');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }
    }

})();