module.exports = class ManagersLoader {
    constructor({ config }) {
        this.config = config;
        this.managers = {};
    }

    load() {
        this.managers.auth = new (
            require("../managers/entities/auth/Auth.manager")
        )();
        this.managers.school = new (
            require("../managers/entities/school/School.manager")
        )();

        this.managers.classroom = new (
            require("../managers/entities/classroom/Classroom.manager")
        )();

        this.managers.student = new (
            require("../managers/entities/student/Student.manager")
        )();

        return this.managers;
    }
};
