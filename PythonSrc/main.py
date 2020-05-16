from UserData import *
from WhereToTypes import *
from Destination import *

mattsProfile = UserData( "Matt Gaylor", 24 )

venice = Destination( "Venice", "Italy", TravelledState.HasBeen, 0, 0 )
shanghai = Destination( "Shanghai", "China", TravelledState.HasBeen, 2, 2 )
lima = Destination( "Lima", "Peru", TravelledState.WantsToGo, 3, 3 )
anywhereButHere = Destination( "", "Outside of Natalie's Living Room", TravelledState.WantsToGo, 3, 3 )
georgia = Destination( "Georgia", "USA", TravelledState.WantsToGo, 3, 3 )
Singapore = Destination( "", "Singapore", TravelledState.WantsToGo, 3, 3 )

mattsProfile.AddDestination( venice )
mattsProfile.AddDestination( shanghai )
mattsProfile.AddDestination( lima )
mattsProfile.AddDestination( anywhereButHere )
mattsProfile.AddDestination( georgia )

mattsProfile.ToString()