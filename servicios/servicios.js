// =====================================================
//  CLASE SERVICIOS - CONSUMO DE API THE SPORTS DB
// =====================================================
export class Servicios {
  constructor() {
    this.datos = null;
  }

  async functionTeams(nombre) {
    try {
      const respuesta = await fetch(`https://www.thesportsdb.com/api/v1/json/123/searchteams.php?t=${nombre}`);
      if (respuesta.ok) {
        const datos = await respuesta.json();
        console.log("Equipos:", datos.teams);
        return datos.teams;
      }
      alert("No se pudieron obtener datos del equipo");
      return null;
    } catch (error) {
      console.error("Error con la API (Equipos):", error);
    }
  }

  async functionEvents(evento) {
    try {
      const respuesta = await fetch(`https://www.thesportsdb.com/api/v1/json/123/searchevents.php?e=${evento}`);
      if (respuesta.ok) {
        const datos = await respuesta.json();
        console.log("Eventos:", datos.event);
        return datos.event;
      }
      alert("No se pudo obtener la info del evento");
      return null;
    } catch (error) {
      console.error("Error con la API (Eventos):", error);
    }
  }

  async functionPlayers(jugador) {
    try {
      const respuesta = await fetch(`https://www.thesportsdb.com/api/v1/json/123/searchplayers.php?p=${jugador}`);
      if (respuesta.ok) {
        const datos = await respuesta.json();
        console.log("Jugadores:", datos.player);
        return datos.player;
      }
      alert("No se pudo obtener la info del jugador");
      return null;
    } catch (error) {
      console.error("Error con la API (Jugadores):", error);
    }
  }

  async functionVenues(estadio) {
    try {
      const respuesta = await fetch(`https://www.thesportsdb.com/api/v1/json/123/searchvenues.php?v=${estadio}`);
      if (respuesta.ok) {
        const datos = await respuesta.json();
        console.log("Estadios:", datos.venues);
        return datos.venues;
      }
      alert("No se pudo obtener la info del estadio");
      return null;
    } catch (error) {
      console.error("Error con la API (Estadios):", error);
    }
  }
}
