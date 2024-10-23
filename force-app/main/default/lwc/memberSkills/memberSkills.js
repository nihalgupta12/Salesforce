import { LightningElement, wire } from 'lwc';
import addTeamMember from '@salesforce/apex/TeamController.addTeamMember';
import getTeamList from '@salesforce/apex/TeamController.getTeamList';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class MemberSkills extends LightningElement {

error;
skill ='';
memberName = '';
team ='';
teamList;

    @wire(getTeamList) myTeamList({data,error}){
        if(data){
            this.teamList=[];
            for (let item in data) {
                var item1 = {
                    "label": data[item].TeamName__c,
                    "value": data[item].Id
                };
                this.teamList.push(item1);
            }
        }
        if(error){
            this.error=error;
        }
    }

    changeHandler(event){
        if(event.target.name === 'skills'){
            this.skill = event.detail.value;
        }else if(event.target.name === 'memberName'){
            this.memberName = event.detail.value;
        }else if(event.target.name === 'team'){
            this.team = event.detail.value;
        }
    }

    handleSubmit(){
        
        addTeamMember({ memberName:this.memberName, skills:this.skill, team:this.team, }).then(result=>{
            if(result){
                const selectedEvent = new CustomEvent('reloadlist', { detail: true });
                this.dispatchEvent(selectedEvent);

                const event = new ShowToastEvent({
                    title: 'Congratulations!!',
                    message: 'Memeber added Successfully',
                    variant: 'success'
                });
                this.dispatchEvent(event);
                this.skill ='';
                this.memberName = '';
                this.team = '';
            }
        }).catch(error=>{
            this.handleError(error);
        })
    }
    handleError(error) {
        const event = new ShowToastEvent({
            title: 'Error in adding new team member!',
            message: error,
            variant: 'error'
        });
        this.dispatchEvent(event);
    }

}