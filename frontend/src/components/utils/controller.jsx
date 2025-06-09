const student = {
    firstName: 'Aayush',
    lastName: 'Kumar',
    dob: '',
    StudentClass: '8',
    gender: '',
    section: 'a',
    fatherName: '',
    motherName: '',
    email: '',
    fatherphoneno: '',
    motherphoneno: '',
    attendance: {
        present: [
            { date: '' }
        ],
        absent: [
            { date: '' }
        ],
        late: [
            {
                reason: 'Metro issue',
                date: ''
            }, {
                reason: 'Raining',
                date: ''
            }
        ],
        leave: [
            {
                reason: "Medical issue",
                StartingDate: '5th May',
                EndDate: '8th June'
            },
            {
                reason: "Family Wedding ",
                StartingDate: '5th June',
                EndDate: '8th July'
            },
        ]
    },
    Academics: {
        timetable: [
            {

                subjectname: '',
                timing: [{
                    day: '',
                    time: ''
                }],
                teacher: ''

            }
        ],
    },
    Homework: [
        {
            subject: '',
            HomeworkTitle: '',
            HomeworkDescription: '',
            deadline: '',
            attachment: ''
        }
    ],
    results: {
        yearwise: [
            {
                year: '',
                percentage: '',
                subjects: [
                    {
                        subject: '',
                        marks: 64
                    }, {
                        subject: '',
                        marks: 85
                    }
                ]

            }
        ],
        current: {
            ut1: [{
                subject: '',
                marking: ''
            }],
            ut2: [{
                subject: '',
                marking: ''
            }],
            halfyearly: [{
                subject: '',
                marking: '',
                MaxMark: ''
            }],
            ut3: [{
                subject: '',
                marking: '',
                MaxMark: ''
            }],
            ut4: [{
                subject: '',
                marking: '',
                MaxMark: ''
            }],
            annualexam: [{
                subject: '',
                marking: '',
                MaxMark: ''
            }],
            practicalexam: [{
                subject: '',
                marking: '',
                MaxMark: ''
            }]
        }
    },
    onlineClasses: {

    }



}

const staff = {
    firstName: 'Aayush',
    lastName: 'Kumar',
    dob: '',
    classSlots: [
        {
            class: '',
            section: '',
            subject: '',
            timing: [{
                date: '',
                time: ''
            }],
        }
    ],
    attendance: {
        present: [
            { date: '' }
        ],
        absent: [
            { date: '' }
        ],
        late: [
            {
                reason: 'Metro issue',
                date: ''
            }, {
                reason: 'Raining',
                date: ''
            }
        ],
        leave: [
            {
                reason: "Medical issue",
                StartingDate: '5th May',
                EndDate: '8th June'
            },
            {
                reason: "Family Wedding ",
                StartingDate: '5th June',
                EndDate: '8th July'
            },
        ]
    },
    Homework: [
        {
            studentid: '',
            Name: '',
            rollno: '',
            subject: '',
            HomeworkTitle: '',
            HomeworkDescription: '',
            deadline: '',
            attachment: ''
        }
    ]

}

const admin = {

    timetable: {
        class: []
    }
}
