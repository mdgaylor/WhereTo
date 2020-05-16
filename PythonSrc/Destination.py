from WhereToTypes import *

class Destination:

    def __init__( self, city, country, travelState, latitude, longitude ):
        self.city = city
        self.country = country
        self.travelState = travelState
        self.latitude = latitude
        self.longitude = longitude

    def __init__( self, city, country, travelState, latitude, longitude ):
        self.city = city
        self.country = country
        self.travelState = travelState
        self.latitude = latitude
        self.longitude = longitude

    def GetLocationName( self ):
        location = ""
        if( city != "" ):
            location += str( self.city ) + ", "
        
        location += str( country )
        return location
    
    def GetTravelState( self ):
        return self.travelState

    def PrintDestinations( destinations ):
        numLocations = len( destinations )
        locationString = ""

        if( numLocations > 1 ):
            locationString += str( destinations[ 0 ].GetLocationName() )

        for idx in range( 1, numLocations ):
            locationString += ", " + str( destinations[ idx ].GetLocationName() )
        
        print( locationString )