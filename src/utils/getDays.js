export const getDays = (current) => {
    const week = [];
    for (let i = 0; i < 7; i++) {
        week.push(
            new Date(current),
        );
        current.setDate(current.getDate() + 1);
    }
    /*
    I use this slice method to remove first and last day from array of 7
    to get 5 day forecast starting from current
   * */
    return week.slice(1, -1);
};
