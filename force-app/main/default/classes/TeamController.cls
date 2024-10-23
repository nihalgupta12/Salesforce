public with sharing class TeamController {

    @AuraEnabled
    public static boolean addTeamMember(String memberName, String skills , id team){
        try{
            TeamMember__c teamMember= new TeamMember__c(TeamMemberName__c=memberName,Skills__c=skills , Team__c = team);
            insert teamMember;
            return true;
        }
        catch(Exception e){
            throw e;
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<Team__c> getTeamList(){
        List<Team__c> teamList= [Select id,TeamName__c from Team__c];
        return teamList;
    }

    @AuraEnabled
    public static List<TeamMember__c> getTeamMemberList(){
        List<TeamMember__c> teamMemberList= [Select id,	TeamMemberName__c,Team__r.TeamName__c ,Skills__c from TeamMember__c];
        System.debug(teamMemberList);
        return teamMemberList;
    }

}
