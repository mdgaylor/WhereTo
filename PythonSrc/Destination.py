from WhereToTypes import *

class Destination:

    def __init__( self, city, country, travelState, latitude, longitude, timesBeen = 0 ):
        self.city = city
        self.country = country
        self.travelState = travelState
        self.latitude = latitude
        self.longitude = longitude
        self.timesBeen = timesBeen

    def GetLocationName( self ):
        location = ""
        if( self.city != "" ):
            location += str( self.city ) + ", "
        
        location += str( self.country )
        return location
    
    def SetTravelState( self, travelState ):
        self.travelState = travelState

    def IncrTimesBeen( self ):
        self.timesBeen += 1

    def GetTravelState( self ):
        return self.travelState
        
    # NOTE: I decided for the time being to check that city and country match. It is a design discussion for later how this works.
    #       For example if the person wants to go to Peru and they go to Lima, how can we cross Peru off their list. There are certainly
    #       duplicate city names and lat and long are too specific.s
    def Compare( self, other ):
        return self.city == other.city and self.country == other.country and self.latitude == other.latitude and self.longitude == other.longitude

    def PrintDestinations( destinations ):
        numLocations = len( destinations )
        locationString = ""

        if( numLocations > 1 ):
            locationString += str( destinations[ 0 ].GetLocationName() )

        for idx in range( 1, numLocations ):
            locationString += ", " + str( destinations[ idx ].GetLocationName() )
        
        print( locationString )