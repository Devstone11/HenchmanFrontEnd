var development = 'http://localhost:3000/';
var production = '';

//switch this to production before deployment
var rootUrl = development;

module.exports = {
  getUsers: rootUrl + 'users/',
  getEncounters: rootUrl + 'campaigns/',
  getScenes: rootUrl + 'encounters/',
  getOneScene: rootUrl + 'scenes/',
  getObstacles: rootUrl + 'obstacles/',
  getNPCs: rootUrl + 'npcs/',
  getPlayers: rootUrl + 'players/',
  getRaceAbilities: rootUrl + 'race_abilities/',
  getRaces: rootUrl + 'races/',
  getItems: rootUrl + 'items/',
  newEncounter: rootUrl + 'encounters/new/',
  newScene: rootUrl + 'scenes/new/',
  newNpc: rootUrl + 'npcs/new/',
  deleteCampaign: rootUrl + 'campaigns/delete/',
  deleteEncounter: rootUrl + 'encounters/delete/',
  deleteScene: rootUrl + 'scenes/delete/'
}
