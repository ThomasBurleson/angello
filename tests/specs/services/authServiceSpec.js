'use strict';

describe('Serivce: AuthService', function () {
    var $rootScope, $q, AuthService;

    var mockLoginService = {
        $getCurrentUser: jasmine.createSpy('$getCurrentUser'),
        $logout: jasmine.createSpy('$logout')
    };

    beforeEach(module('Angello'));

    beforeEach(module(function ($provide) {
        $provide.value('Firebase', function () {
        });
        $provide.value('$firebaseSimpleLogin', function () {
            return mockLoginService;
        });
    }));

    beforeEach(inject(function (_$rootScope_, _$q_, _AuthService_) {
        $rootScope = _$rootScope_;
        $q = _$q_;
        AuthService = _AuthService_;
    }));

    describe('#getCurrentUser', function () {
        it('should ask the login service for the current user', function () {
            var user = null;
            mockLoginService.$getCurrentUser.and.returnValue($q.when('fakeUser'));
            AuthService.getCurrentUser().then(function (result) {
                user = result;
            });
            $rootScope.$apply();
            expect(user).toEqual('fakeUser');
        });
    });

    describe('#logout', function () {
        it('should log out of the loginService', function () {
            AuthService.logout();
            expect(mockLoginService.$logout).toHaveBeenCalled();
        });
    });
});
