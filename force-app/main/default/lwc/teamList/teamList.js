import { LightningElement , track} from 'lwc';
import getTeamList from '@salesforce/apex/TeamController.getTeamList';
import getTeamMemberList from '@salesforce/apex/TeamController.getTeamMemberList';
export default class TeamList extends LightningElement {
    @track teamMemberList=[];
    @track allTeamMembers=[];
    @track teamList=[];
    team='';
    connectedCallback(){
        this.showTeamMembers();
    }

    showTeamMembers(){
        this.teamMemberList = [];
        this.allTeamMembers = [];

        getTeamMemberList().then(result=>{
            if(result){
                this.teamMemberList=result;
                this.allTeamMembers=result;
            }
        }).catch(error=>{
            this.handleError(error.body.fieldErrors.Name[0].message);
        })

        getTeamList().then(result=>{
            if(result){
                this.teamList=[];
                for (let item in result) {
                    this.teamList.push( { label: result[item].TeamName__c, value: result[item].Id});
                }
            }
        }).catch(error=>{
            this.handleError(error.body.fieldErrors.Name[0].message);
        })
    }

    handleError(error) {
        const event = new ShowToastEvent({
            title: 'Error in fetching team!',
            message: error,
            variant: 'error'
        });
        this.dispatchEvent(event);
    }

    changeHandler(event){
        var selectedTeam = this.template.querySelector("lightning-combobox").value;
            this.teamMemberList=this.allTeamMembers.filter(item=>item.Team__c === selectedTeam);
            this.team = event.detail.value;
    }

}