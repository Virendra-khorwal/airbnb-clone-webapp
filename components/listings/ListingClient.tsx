"use client";

import Container from "@components/Container";
import { categories } from "@components/navbar/Categories";
import { Listing, Reservation, User } from "@prisma/client";
import { useMemo } from "react";
import ListingHead from "./ListingHead";
import ListingInfo from "./ListingInfo";

interface ListingClientProps {
	reservation?: Reservation[];
	listing: Listing;
	currentUser: User | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
	listing,
	currentUser,
}) => {
	const category = useMemo(() => {
		return categories.find((item) => item.label === listing.category);
	}, [listing.category]);

	return (
		<Container>
			<div className="max-w-screen-lg mx-auto">
				<div className="flex flex-col gap-6">
                    <ListingHead title={listing.title} imageSrc={listing.imageSrc} locationValue={listing.locationValue} id={listing.id} currentUser={currentUser} />
                    <div className="grid gird-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                        <ListingInfo user={currentUser} category={category} description={listing.description} roomCount={listing.roomCount} guestCount={listing.guestCount} bathroomCount={listing.bathroomCount} locationValue={listing.locationValue} />
                    </div>
                </div>
			</div>
		</Container>
	);
};

export default ListingClient;
