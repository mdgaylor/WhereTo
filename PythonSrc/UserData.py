from WhereToTypes import *
from Destination import *

# TODO: There should be some type of verify state of user data function that makes sure there are no
#       cities in placesToGo and placesBeen.

class UserData:
    def __init__( self, name, age ):
        self.name = name
        self.age = age
        self.placesToGo = list()
        self.placesBeen = list()
    
    def AddDestination( self, destination ):
        if( destination.GetTravelState() == TravelledState.HasBeen ):
            self.placesBeen.append( destination )
        elif( destination.GetTravelState() == TravelledState.WantsToGo ):
            self.placesToGo.append( destination )
        else:
            return -1

    def RegisterTrip( self, location ):
        idx = 0

        # Check to see if the city is in the PlacesToGo
        for place in self.placesToGo:
            if( place.Compare( location ) ):
                self.placesToGo.pop( idx )
                place.IncrTimesBeen()
                place.SetTravelState( TravelledState.HasBeen )
                self.AddDestination( place )
                return
            idx += 1
        
        # Check to see if the city is in the PlacesBeen
        for place in self.placesBeen:
            if( place.Compare( location ) ):
                place.IncrTimesBeen()
                return

        # City is not in either list. Add it to PlacesBeen
        location.IncrTimesBeen()
        location.SetTravelState( TravelledState.HasBeen )
        self.AddDestination( location )

    def ToString( self ):
        print( str(self.name) + " is " + str(self.age) + " years old.")
        print( "\tThey want to go to: " )
        Destination.PrintDestinations( self.placesToGo )
        print("\tThey have been to: " )
        Destination.PrintDestinations( self.placesBeen )
        print("\n\n")

    def SerializeState( self ):
        # TODO: Serialize the profile to be placed somewhere ~On the Cloud~
        # This shoudln't be implemented for a while
        return -1