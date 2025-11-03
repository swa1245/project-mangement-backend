export const UserRole = {
    ADMIN: "admin",
    PROJECT_ADMIN: "project_admin",
    MEMBER: "member"
};
export const AvailableuserRoles = Object.values(UserRole);
// by uisng the above AvailableuserRoles we eaxtract all userrole in array format so we can use them to check if a role valid or any other validation
export const TaskStatusEnum = {
    TODO: "todo",
    IN_PROGRESS: "in_progress",
    DONE: "done"
};
export const Availabletaskstatus = Object.values(TaskStatusEnum);
//# sourceMappingURL=constants.js.map