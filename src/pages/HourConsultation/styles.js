import styled from 'styled-components';

const HoursConsultationComponent = styled.div`
    width: 100%;
    min-height: 100vh;

    padding: 20px;

    background-color: ${props => props.theme.appBackground};

    display: flex;
    flex-direction: column;
    align-items: flex-start;

    /* Ajuste CSS do RangePicjer */
    .ant-picker-range{
        min-width: 250px;
    }
    .selectMemberArea{
        width: 300px;
    }

    .memberArea{
        min-height: 80px;
        padding: 32px 0px;
    }

    .mandatoryHours{
        margin-bottom: 48px;
        h2{
            margin-bottom: 16px;
            color: #FFFFFF;
        }
    }

    .mandatoryHoursTable, 
    .hoursSumAndTable, 
    .justificationTable{
        width: 100%;
    }

    .mandatoryHoursTable tr, 
    .hoursSumAndTable tr, 
    .justificationTable tr{
        height: 80px;
        background-color: #141414;
        padding: 0px 20px;
        
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border-bottom: 2px solid #1C1C1D;
    }

    .mandatoryHoursTable tr:first-child, 
    .hoursSumAndTable tr:first-child, 
    .justificationTable tr:first-child{ 
        height: 65px;
        background-color: #1D1D1D;
        
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border-radius: 5px;
    }

    .dayColumn{
        width: 40%;
        min-width: 120px;
        display: flex;
        justify-content: flex-start;
        color: #FFFFFF;
    }

    .startTime, .finishTime, .timeArea, .typeArea{
        width: 30%;
        min-width: 120px;
        display: flex;
        justify-content: flex-start;
        color: #FFFFFF;
    }

    .pointHistoric{
        max-width: 300px;
        margin-bottom: 48px;
        h2{
            margin-bottom: 16px;
            color: #FFFFFF;
        }
    }

    .hoursSumAndTablesArea, .justificationTablesArea{
        width: 100%;
        margin-bottom: 24px;
        h2{
            margin-bottom: 16px;
            color: #FFFFFF;
        }
        .hoursSumAndTable{
            width: 100%;
        }
    }

    .hoursSumAndTablesArea, .justificationTablesArea{
        width: 100%;
        margin-bottom: 48px;
        h2{
            margin-bottom: 16px;
            color: #FFFFFF;
        }
        .hoursSumAndTable{
            width: 100%;
        }
    }
`;

export  { HoursConsultationComponent };