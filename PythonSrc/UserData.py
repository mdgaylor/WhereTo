from WhereToTypes import *
from Destination import *

class UserData:
    def __init__( self, name, age ):
        self.name = name
        self.age = age
        self.placesToGo = list()
        self.placesSeen = list()
    
    def AddDestination( self, destination ):
        if( destination.GetTravelState() == TravelledState.HasBeen ):
            self.placesToGo.append( destination )
        elif( destination.GetTravelState() == TravelledState.WantsToGo ):
            self.placesSeen.append( destination )
        else:
            return -1

    def ToString( self ):
        print( str(self.name) + " is " + str(self.age) + " years old.")
        print( "\tThey have been to: " )
        Destination.PrintDestinations( self.placesToGo )
        print("\tThey want to go to: " )
        Destination.PrintDestinations( self.placesSeen )

    def SerializeState( self )
        # TODO: Serialize the profile to be placed somewhere ~On the Cloud~
        # This shoudln't be implemented for a while